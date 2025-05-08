
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mic as MicIcon, AlertCircle, Volume2, UploadCloud, DownloadCloud, Copy, Settings2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TextToSpeechInput } from "@/ai/flows/text-to-speech-flow";
import { textToSpeech } from "@/ai/flows/text-to-speech-flow";
import { speechToText } from "@/ai/flows/speech-to-text-flow";
import { useToast } from "@/hooks/use-toast"; 

interface VoiceToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceToolsModal({ isOpen, onClose }: VoiceToolsModalProps) {
  const { toast } = useToast(); 
  const [activeTab, setActiveTab] = useState("tts");

  // TTS States
  const [ttsInput, setTtsInput] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsError, setTtsError] = useState<string | null>(null);
  const [generatedTextToSpeak, setGeneratedTextToSpeak] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>();
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);

  // STT States
  const [sttLoading, setSttLoading] = useState(false);
  const [sttError, setSttError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);


  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        if (availableVoices.length > 0 && !selectedVoiceURI) {
          const defaultEngVoice = availableVoices.find(voice => voice.lang.startsWith('en') && voice.default) 
            || availableVoices.find(voice => voice.lang.startsWith('en')) 
            || availableVoices[0];
          if (defaultEngVoice) {
            setSelectedVoiceURI(defaultEngVoice.voiceURI);
          }
        }
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
        // onvoiceschanged might fire early, or voices might already be available
        const initialVoices = window.speechSynthesis.getVoices();
        if (initialVoices.length > 0) {
            loadVoices();
        } else {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }
    
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
    };
  }, [selectedVoiceURI]); // Re-run if selectedVoiceURI changes, or for initial load.

  const handleSpeak = async () => {
    setTtsLoading(true);
    setTtsError(null);
    setGeneratedTextToSpeak(null);
    try {
      const inputForFlow: TextToSpeechInput = { text: ttsInput.trim() !== "" ? ttsInput : undefined };
      const result = await textToSpeech(inputForFlow);
      setGeneratedTextToSpeak(result.textToSpeak);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(result.textToSpeak);
        if (selectedVoiceURI) {
          const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
          if (voice) utterance.voice = voice;
        }
        utterance.rate = speechRate;
        utterance.pitch = speechPitch;
        utterance.onerror = (event) => {
          console.error("SpeechSynthesisUtterance.onerror", event);
          setTtsError("Could not play audio. Your browser might not support speech synthesis or has an issue.");
          toast({ title: "Speech Error", description: "Could not play audio. Check browser support or permissions.", variant: "destructive" });
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setTtsError("Speech synthesis is not supported in your browser.");
        toast({ title: "Unsupported Feature", description: "Speech synthesis is not supported in your browser.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error in text-to-speech flow:", error);
      setTtsError("Failed to generate speech. Please try again.");
      toast({ title: "TTS Error", description: "Failed to generate speech. Please try again.", variant: "destructive" });
    }
    setTtsLoading(false);
  };

  const startRecording = async () => {
    setSttError(null);
    setTranscript(null);
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setAudioPreviewUrl(null);
    setRecordedAudioBlob(null);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // Ensure MIME type matches recorder
          setRecordedAudioBlob(audioBlob);
          const audioDataUri = await blobToDataURI(audioBlob);
          setAudioPreviewUrl(URL.createObjectURL(audioBlob));
          
          setSttLoading(true);
          try {
            const result = await speechToText({ audioDataUri });
            setTranscript(result.transcript);
          } catch (error) {
            console.error("Error in speech-to-text flow:", error);
            setSttError("Failed to transcribe audio. Please try again.");
            toast({ title: "STT Error", description: "Failed to transcribe audio. Please try again.", variant: "destructive" });
          }
          setSttLoading(false);
          stream.getTracks().forEach(track => track.stop()); // Stop media stream tracks
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setSttError("Could not access microphone. Please check permissions.");
        toast({ title: "Microphone Error", description: "Could not access microphone. Please check permissions.", variant: "destructive" });
      }
    } else {
      setSttError("Audio recording is not supported in your browser.");
      toast({ title: "Unsupported Feature", description: "Audio recording is not supported in your browser.", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false); // This should be set here, not only in onstop
  };

  const blobToDataURI = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject(new Error("Failed to convert blob to Data URI"));
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  const downloadFile = (filename: string, content: string, type: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    toast({ title: "Downloaded", description: `${filename} downloaded.`});
  };

  const downloadAudioBlob = (filename: string, blob: Blob | null) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast({ title: "Downloaded", description: `${filename} downloaded.`});
  };

  const copyToClipboard = async (text: string | null) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied to clipboard!" });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({ title: "Failed to copy", description: "Could not copy text to clipboard.", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset TTS states
      setTtsInput("");
      setTtsLoading(false);
      setTtsError(null);
      setGeneratedTextToSpeak(null);
      setSpeechRate(1);
      setSpeechPitch(1);
      // voices and selectedVoiceURI are generally fine to persist if modal reopens
      
      // Reset STT states
      setSttLoading(false);
      setSttError(null);
      setTranscript(null);
      if (isRecording) { // Ensure recording stops if modal is closed while recording
         if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
        }
      }
      setIsRecording(false);
      audioChunksRef.current = [];
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
      }
      setRecordedAudioBlob(null);
    }
  }, [isOpen, audioPreviewUrl, isRecording]);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">AI Voice Tools</DialogTitle>
          <DialogDescription>
            Experiment with Text-to-Speech and Speech-to-Text functionalities powered by Nedzo AI. 
            Voice options are provided by your browser.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="flex-grow overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tts">Text-to-Speech</TabsTrigger>
            <TabsTrigger value="stt">Speech-to-Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tts" className="flex-grow overflow-y-auto p-1 mt-0 space-y-4">
            <div className="space-y-4 p-4">
              <div>
                <Label htmlFor="tts-input">Text to Speak (Optional)</Label>
                <Textarea
                  id="tts-input"
                  value={ttsInput}
                  onChange={(e) => setTtsInput(e.target.value)}
                  placeholder="Enter text here, or leave blank for an AI-generated phrase..."
                  rows={3}
                  className="mt-1"
                />
                 <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => downloadFile("tts_input.txt", ttsInput, "text/plain")} disabled={!ttsInput}>
                        <DownloadCloud className="mr-2 h-4 w-4" /> Input
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(ttsInput)} disabled={!ttsInput}>
                        <Copy className="mr-2 h-4 w-4" /> Input
                    </Button>
                 </div>
              </div>

              <div className="space-y-3 p-3 border rounded-md">
                <Label className="flex items-center gap-2 font-semibold"><Settings2 className="h-5 w-5 text-primary"/>Speech Controls</Label>
                <div>
                  <Label htmlFor="voice-select">Voice</Label>
                  <Select value={selectedVoiceURI} onValueChange={setSelectedVoiceURI} disabled={voices.length === 0}>
                    <SelectTrigger id="voice-select">
                      <SelectValue placeholder={voices.length > 0 ? "Select voice..." : "Loading voices..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map(voice => (
                        <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang}) {voice.default ? "[Default]" : ""}
                        </SelectItem>
                      ))}
                       {voices.length === 0 && <SelectItem value="no-voice" disabled>No voices available or still loading.</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="speech-rate">Rate: {speechRate.toFixed(1)}</Label>
                  <Slider id="speech-rate" min={0.1} max={2} step={0.1} value={[speechRate]} onValueChange={(v) => setSpeechRate(v[0])} />
                </div>
                <div>
                  <Label htmlFor="speech-pitch">Pitch: {speechPitch.toFixed(1)}</Label>
                  <Slider id="speech-pitch" min={0} max={2} step={0.1} value={[speechPitch]} onValueChange={(v) => setSpeechPitch(v[0])} />
                </div>
              </div>

              <Button onClick={handleSpeak} disabled={ttsLoading} className="w-full sm:w-auto">
                {ttsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Volume2 className="mr-2 h-4 w-4" />}
                Generate & Speak
              </Button>
              <p className="text-xs text-muted-foreground">Note: Actual speech audio download is not available via browser API. You can download the text.</p>


              {generatedTextToSpeak && !ttsLoading && (
                <div className="mt-4 p-3 bg-muted rounded-md space-y-2">
                  <p className="font-semibold">AI is saying:</p>
                  <p className="italic">"{generatedTextToSpeak}"</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => downloadFile("generated_speech.txt", generatedTextToSpeak, "text/plain")}>
                        <DownloadCloud className="mr-2 h-4 w-4" /> Text
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedTextToSpeak)}>
                        <Copy className="mr-2 h-4 w-4" /> Text
                    </Button>
                  </div>
                </div>
              )}
              {ttsError && (
                <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>{ttsError}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stt" className="flex-grow overflow-y-auto p-1 mt-0">
            <div className="space-y-4 p-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={startRecording} disabled={isRecording || sttLoading} className="flex-1">
                  <MicIcon className="mr-2 h-4 w-4" />
                  {isRecording ? "Recording..." : "Start Recording"}
                </Button>
                <Button onClick={stopRecording} disabled={!isRecording || sttLoading} variant="outline" className="flex-1">
                  {/* Use a different icon or just text for Stop */}
                  <MicIcon className="mr-2 h-4 w-4 opacity-50" /> 
                  Stop Recording
                </Button>
              </div>

              {isRecording && (
                <div className="flex items-center justify-center p-3 bg-primary/10 text-primary rounded-md">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  <span>Recording audio... Speak into your microphone.</span>
                </div>
              )}

              {sttLoading && (
                <div className="flex items-center justify-center p-3 bg-muted rounded-md">
                  <UploadCloud className="h-5 w-5 mr-2 animate-spin" />
                  <span>Processing audio... Please wait.</span>
                </div>
              )}
              
              {audioPreviewUrl && !isRecording && !sttLoading && (
                <div className="mt-4 space-y-2">
                  <Label>Recorded Audio:</Label>
                  <audio controls src={audioPreviewUrl} className="w-full mt-1">
                    Your browser does not support the audio element.
                  </audio>
                  <Button variant="outline" size="sm" onClick={() => downloadAudioBlob("recorded_audio.webm", recordedAudioBlob)} disabled={!recordedAudioBlob}>
                     <DownloadCloud className="mr-2 h-4 w-4" /> Download Audio
                  </Button>
                </div>
              )}

              {transcript && !sttLoading && (
                <div className="mt-4 p-3 bg-muted rounded-md space-y-2">
                  <Label className="font-semibold block mb-1">Transcript:</Label>
                  <p className="whitespace-pre-wrap">{transcript}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => downloadFile("transcript.txt", transcript, "text/plain")}>
                        <DownloadCloud className="mr-2 h-4 w-4" /> Transcript
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(transcript)}>
                        <Copy className="mr-2 h-4 w-4" /> Transcript
                    </Button>
                  </div>
                </div>
              )}
              {sttError && (
                <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>{sttError}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-auto pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


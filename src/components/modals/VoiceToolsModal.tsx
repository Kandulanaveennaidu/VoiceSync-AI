
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Mic as MicIcon, AlertCircle, Volume2, UploadCloud, DownloadCloud, Copy, Settings2, SendHorizonal, User, Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TextToSpeechInput } from "@/ai/flows/text-to-speech-flow";
import { textToSpeech } from "@/ai/flows/text-to-speech-flow";
import { speechToText } from "@/ai/flows/speech-to-text-flow";
import { getAgentResponse } from "@/ai/flows/conversational-agent-flow";
import { useToast } from "@/hooks/use-toast"; 
import { cn } from "@/lib/utils";

interface VoiceToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConversationMessage {
  id: string;
  speaker: 'user' | 'agent';
  text: string;
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
  const [isRecording, setIsRecording] = useState(false); // For STT Tab
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);

  // Voice Assistant States
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isAssistantListening, setIsAssistantListening] = useState(false);
  const [isAgentReplying, setIsAgentReplying] = useState(false); // TTS for agent
  const [assistantProcessing, setAssistantProcessing] = useState(false); // Genkit call
  const [assistantError, setAssistantError] = useState<string | null>(null);
  const conversationScrollAreaRef = useRef<HTMLDivElement>(null);
  const assistantAudioChunksRef = useRef<Blob[]>([]);
  const assistantMediaRecorderRef = useRef<MediaRecorder | null>(null);


  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        if (availableVoices.length > 0 && !selectedVoiceURI) {
          // Prioritize English voices, then default, then first available
          const preferredVoice = 
            availableVoices.find(voice => voice.lang.toLowerCase().startsWith('en-us') && voice.default) ||
            availableVoices.find(voice => voice.lang.toLowerCase().startsWith('en-gb') && voice.default) ||
            availableVoices.find(voice => voice.lang.toLowerCase().startsWith('en') && voice.default) ||
            availableVoices.find(voice => voice.lang.toLowerCase().startsWith('en-us')) ||
            availableVoices.find(voice => voice.lang.toLowerCase().startsWith('en-gb')) ||
            availableVoices.find(voice => voice.lang.toLowerCase().startsWith('en')) ||
            (availableVoices.find(voice => voice.lang.toLowerCase().startsWith('te')) && availableVoices.find(voice => voice.lang.toLowerCase().startsWith('te'))) || // Telugu
            availableVoices.find(voice => voice.default) || 
            availableVoices[0];
          if (preferredVoice) {
            setSelectedVoiceURI(preferredVoice.voiceURI);
          }
        }
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
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
        window.speechSynthesis.cancel(); // Stop any ongoing speech
      }
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
      // Stop any active recordings if modal is closed
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (assistantMediaRecorderRef.current && assistantMediaRecorderRef.current.state === "recording") {
        assistantMediaRecorderRef.current.stop();
      }
    };
  }, [selectedVoiceURI, audioPreviewUrl]);

  useEffect(() => {
    if (conversationScrollAreaRef.current) {
      conversationScrollAreaRef.current.scrollTop = conversationScrollAreaRef.current.scrollHeight;
    }
  }, [conversation]);


  const handleSpeakTTS = async () => {
    setTtsLoading(true);
    setTtsError(null);
    setGeneratedTextToSpeak(null);
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();

    try {
      const inputForFlow: TextToSpeechInput = { text: ttsInput.trim() !== "" ? ttsInput : undefined };
      const result = await textToSpeech(inputForFlow);
      setGeneratedTextToSpeak(result.textToSpeak);
      speakText(result.textToSpeak, () => setTtsLoading(false), (err) => {
        setTtsError(err);
        setTtsLoading(false);
      });
    } catch (error) {
      console.error("Error in text-to-speech flow:", error);
      const errMsg = error instanceof Error ? error.message : "Failed to generate speech.";
      setTtsError(`TTS Flow Error: ${errMsg}`);
      toast({ title: "TTS Error", description: `Failed to generate speech. ${errMsg}`, variant: "destructive" });
      setTtsLoading(false);
    }
  };

  const speakText = (text: string, onEndCallback?: () => void, onErrorCallback?: (errorMsg: string) => void) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoiceURI) {
        const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
        if (voice) utterance.voice = voice;
      }
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      utterance.onend = () => {
        if (onEndCallback) onEndCallback();
      };
      utterance.onerror = (event) => {
        console.error("SpeechSynthesisUtterance.onerror", event);
        const errorMsg = "Could not play audio. Your browser might not support speech synthesis or has an issue.";
        if (onErrorCallback) onErrorCallback(errorMsg);
        else toast({ title: "Speech Error", description: errorMsg, variant: "destructive" });
      };
      window.speechSynthesis.speak(utterance);
    } else {
      const errorMsg = "Speech synthesis is not supported in your browser.";
      if (onErrorCallback) onErrorCallback(errorMsg);
      else toast({ title: "Unsupported Feature", description: errorMsg, variant: "destructive" });
      if (onEndCallback) onEndCallback(); // still call onEnd to unlock UI
    }
  };


  const startSTTRecording = async () => {
    setSttError(null);
    setTranscript(null);
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setAudioPreviewUrl(null);
    setRecordedAudioBlob(null);
    await startRecordingLogic(mediaRecorderRef, audioChunksRef, setIsRecording, setRecordedAudioBlob, setAudioPreviewUrl, async (audioDataUri) => {
      setSttLoading(true);
      try {
        const result = await speechToText({ audioDataUri });
        setTranscript(result.transcript);
      } catch (error) {
        console.error("Error in STT flow:", error);
        const errMsg = error instanceof Error ? error.message : "Failed to transcribe audio.";
        setSttError(`STT Flow Error: ${errMsg}`);
        toast({ title: "STT Error", description: `Failed to transcribe. ${errMsg}`, variant: "destructive" });
      }
      setSttLoading(false);
    }, (err) => {
      setSttError(err);
      toast({ title: "Microphone Error", description: err, variant: "destructive" });
    });
  };

  const stopSTTRecording = () => {
    stopRecordingLogic(mediaRecorderRef, setIsRecording);
  };


  const startVoiceAssistantListening = async () => {
    setAssistantError(null);
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    setIsAgentReplying(false);

    await startRecordingLogic(assistantMediaRecorderRef, assistantAudioChunksRef, setIsAssistantListening, null, null, async (audioDataUri) => {
      setAssistantProcessing(true); // For STT part of assistant
      try {
        const sttResult = await speechToText({ audioDataUri });
        if (sttResult.transcript && sttResult.transcript.trim() !== "") {
          setConversation(prev => [...prev, { id: Date.now().toString(), speaker: 'user', text: sttResult.transcript }]);
          
          // Now get agent response
          const agentResponse = await getAgentResponse({ userMessage: sttResult.transcript });
          setConversation(prev => [...prev, { id: (Date.now()+1).toString(), speaker: 'agent', text: agentResponse.reply }]);
          
          setIsAgentReplying(true);
          speakText(agentResponse.reply, () => setIsAgentReplying(false), (err) => {
            setAssistantError(`Agent TTS Error: ${err}`);
            setIsAgentReplying(false);
          });

        } else {
           setAssistantError("No speech detected or transcription was empty.");
        }
      } catch (error) {
        console.error("Error in Voice Assistant flow:", error);
        const errMsg = error instanceof Error ? error.message : "An unknown error occurred.";
        setAssistantError(`Assistant Error: ${errMsg}`);
        toast({ title: "Assistant Error", description: errMsg, variant: "destructive" });
      }
      setAssistantProcessing(false);
    }, (err) => {
      setAssistantError(err);
      toast({ title: "Microphone Error", description: err, variant: "destructive" });
    });
  };

  const stopVoiceAssistantListening = () => {
    stopRecordingLogic(assistantMediaRecorderRef, setIsAssistantListening);
  };


  const startRecordingLogic = async (
    recorderRef: React.MutableRefObject<MediaRecorder | null>,
    chunksRef: React.MutableRefObject<Blob[]>,
    setIsRecState: React.Dispatch<React.SetStateAction<boolean>>,
    setBlobState: React.Dispatch<React.SetStateAction<Blob | null>> | null,
    setPreviewUrlState: React.Dispatch<React.SetStateAction<string | null>> | null,
    onStopCallback: (audioDataUri: string) => Promise<void>,
    onErrorCallback: (errorMsg: string) => void
  ) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Ensure correct MIME type. Opus is good for quality and size, webm is widely supported.
        // Let browser pick if 'audio/webm; codecs=opus' not supported.
        const options = MediaRecorder.isTypeSupported('audio/webm; codecs=opus') ? 
                        { mimeType: 'audio/webm; codecs=opus' } : 
                        MediaRecorder.isTypeSupported('audio/webm') ? 
                        { mimeType: 'audio/webm'} : {};

        recorderRef.current = new MediaRecorder(stream, options);
        chunksRef.current = [];

        recorderRef.current.ondataavailable = (event) => {
          chunksRef.current.push(event.data);
        };

        recorderRef.current.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, { type: recorderRef.current?.mimeType || 'audio/webm' });
          if (setBlobState) setBlobState(audioBlob);
          const audioDataUri = await blobToDataURI(audioBlob);
          if (setPreviewUrlState && audioBlob.size > 0) setPreviewUrlState(URL.createObjectURL(audioBlob));
          
          if (audioBlob.size > 0) {
            await onStopCallback(audioDataUri);
          } else {
            onErrorCallback("No audio data recorded. Please try again.");
          }
          stream.getTracks().forEach(track => track.stop());
        };

        recorderRef.current.start();
        setIsRecState(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        const errMsg = "Could not access microphone. Please check permissions.";
        onErrorCallback(errMsg);
        setIsRecState(false); // Ensure state is reset
      }
    } else {
      const errMsg = "Audio recording is not supported in your browser.";
      onErrorCallback(errMsg);
      setIsRecState(false); // Ensure state is reset
    }
  };

  const stopRecordingLogic = (
    recorderRef: React.MutableRefObject<MediaRecorder | null>,
    setIsRecState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
    }
    setIsRecState(false);
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
      // speechRate, speechPitch, voices, selectedVoiceURI can persist
      
      // Reset STT states
      setSttLoading(false);
      setSttError(null);
      setTranscript(null);
      if (isRecording) stopSTTRecording();
      audioChunksRef.current = [];
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
      }
      setRecordedAudioBlob(null);

      // Reset Assistant states
      setConversation([]);
      if(isAssistantListening) stopVoiceAssistantListening();
      setIsAgentReplying(false);
      setAssistantProcessing(false);
      setAssistantError(null);
      assistantAudioChunksRef.current = [];

      // Cancel any ongoing speech synthesis
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen, isRecording, isAssistantListening, audioPreviewUrl]); // Dependencies ensure cleanup


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">AI Voice Tools</DialogTitle>
          <DialogDescription>
            Experiment with Text-to-Speech, Speech-to-Text, and our AI Voice Assistant. 
            Voice options are provided by your browser.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="flex-grow overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tts">Text-to-Speech</TabsTrigger>
            <TabsTrigger value="stt">Speech-to-Text</TabsTrigger>
            <TabsTrigger value="assistant">AI Voice Assistant</TabsTrigger>
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

              <Button onClick={handleSpeakTTS} disabled={ttsLoading} className="w-full sm:w-auto">
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
                <Button onClick={startSTTRecording} disabled={isRecording || sttLoading} className="flex-1">
                  <MicIcon className="mr-2 h-4 w-4" />
                  {isRecording ? "Recording..." : "Start Recording"}
                </Button>
                <Button onClick={stopSTTRecording} disabled={!isRecording || sttLoading} variant="outline" className="flex-1">
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

          <TabsContent value="assistant" className="flex-grow overflow-y-auto p-1 mt-0 flex flex-col">
            <div className="p-4 flex flex-col flex-grow space-y-4">
              <ScrollArea className="flex-grow h-64 border rounded-md p-3" ref={conversationScrollAreaRef}>
                {conversation.length === 0 && (
                  <p className="text-muted-foreground text-center py-10">
                    Click the microphone to start talking to the Nedzo AI Assistant.
                  </p>
                )}
                {conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "mb-3 p-3 rounded-lg max-w-[85%] flex items-start gap-2",
                      msg.speaker === 'user' ? 'bg-primary/10 text-primary-foreground ml-auto rounded-br-none' : 'bg-muted text-foreground mr-auto rounded-bl-none'
                    )}
                  >
                    {msg.speaker === 'user' ? <User className="h-5 w-5 text-primary flex-shrink-0"/> : <Bot className="h-5 w-5 text-accent flex-shrink-0" />}
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                ))}
                 {isAssistantListening && (
                    <div className="flex items-center justify-center p-2 text-primary">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        <span>Listening...</span>
                    </div>
                 )}
                 {assistantProcessing && !isAssistantListening && ( // Show processing after listening stops
                    <div className="flex items-center justify-center p-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        <span>Thinking...</span>
                    </div>
                 )}
                {isAgentReplying && (
                    <div className="flex items-center justify-center p-2 text-accent">
                        <Volume2 className="h-4 w-4 mr-2 animate-pulse" />
                        <span>Speaking...</span>
                    </div>
                )}

              </ScrollArea>
              
              {assistantError && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p className="text-sm">{assistantError}</p>
                </div>
              )}

              <div className="mt-auto flex justify-center">
                <Button
                  onClick={isAssistantListening ? stopVoiceAssistantListening : startVoiceAssistantListening}
                  disabled={assistantProcessing || isAgentReplying}
                  size="lg"
                  className={cn("rounded-full p-6 w-20 h-20", isAssistantListening ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90")}
                  aria-label={isAssistantListening ? "Stop listening" : "Start listening"}
                >
                  {isAssistantListening ? (
                    <MicIcon className="h-8 w-8 animate-pulse" />
                  ) : assistantProcessing ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <MicIcon className="h-8 w-8" />
                  )}
                </Button>
              </div>
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


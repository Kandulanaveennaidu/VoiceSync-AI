
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Mic as MicIcon, Play, AlertCircle, Volume2, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { textToSpeech } from "@/ai/flows/text-to-speech-flow";
import { speechToText } from "@/ai/flows/speech-to-text-flow";

interface VoiceToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceToolsModal({ isOpen, onClose }: VoiceToolsModalProps) {
  const [ttsInput, setTtsInput] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsError, setTtsError] = useState<string | null>(null);
  const [generatedTextToSpeak, setGeneratedTextToSpeak] = useState<string | null>(null);

  const [sttLoading, setSttLoading] = useState(false);
  const [sttError, setSttError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);


  useEffect(() => {
    // Clean up recording state if modal is closed while recording
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
    };
  }, [audioPreviewUrl]);
  
  const handleSpeak = async () => {
    setTtsLoading(true);
    setTtsError(null);
    setGeneratedTextToSpeak(null);
    try {
      const result = await textToSpeech({ text: ttsInput || undefined });
      setGeneratedTextToSpeak(result.textToSpeak);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(result.textToSpeak);
        // You might want to add voice selection or other options here
        // For example:
        // const voices = window.speechSynthesis.getVoices();
        // utterance.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        utterance.onerror = (event) => {
          console.error("SpeechSynthesisUtterance.onerror", event);
          setTtsError("Could not play audio. Your browser might not support speech synthesis or has an issue.");
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setTtsError("Speech synthesis is not supported in your browser.");
      }
    } catch (error) {
      console.error("Error in text-to-speech flow:", error);
      setTtsError("Failed to generate speech. Please try again.");
    }
    setTtsLoading(false);
  };

  const startRecording = async () => {
    setSttError(null);
    setTranscript(null);
    setAudioPreviewUrl(null);
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);


    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // Common format
          const audioDataUri = await blobToDataURI(audioBlob);
          
          const previewUrl = URL.createObjectURL(audioBlob);
          setAudioPreviewUrl(previewUrl);

          setSttLoading(true);
          try {
            const result = await speechToText({ audioDataUri });
            setTranscript(result.transcript);
          } catch (error) {
            console.error("Error in speech-to-text flow:", error);
            setSttError("Failed to transcribe audio. Please try again.");
          }
          setSttLoading(false);
          stream.getTracks().forEach(track => track.stop()); // Stop microphone access
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setSttError("Could not access microphone. Please check permissions.");
      }
    } else {
      setSttError("Audio recording is not supported in your browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const blobToDataURI = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert blob to Data URI"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  // Reset states when modal is closed or opened
  useEffect(() => {
    if (!isOpen) {
      setTtsInput("");
      setTtsLoading(false);
      setTtsError(null);
      setGeneratedTextToSpeak(null);
      
      setSttLoading(false);
      setSttError(null);
      setTranscript(null);
      setIsRecording(false);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      audioChunksRef.current = [];
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
      }
    }
  }, [isOpen, audioPreviewUrl]);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">AI Voice Tools</DialogTitle>
          <DialogDescription>
            Experiment with Text-to-Speech and Speech-to-Text functionalities powered by Nedzo AI.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="tts" className="flex-grow overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tts">Text-to-Speech</TabsTrigger>
            <TabsTrigger value="stt">Speech-to-Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tts" className="flex-grow overflow-y-auto p-1 mt-0">
            <div className="space-y-4 p-4">
              <div>
                <Label htmlFor="tts-input">Text to Speak (Optional)</Label>
                <Textarea
                  id="tts-input"
                  value={ttsInput}
                  onChange={(e) => setTtsInput(e.target.value)}
                  placeholder="Enter text here, or leave blank for an AI-generated phrase..."
                  rows={5}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleSpeak} disabled={ttsLoading} className="w-full sm:w-auto">
                {ttsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Volume2 className="mr-2 h-4 w-4" />}
                Generate & Speak
              </Button>
              {generatedTextToSpeak && !ttsLoading && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="font-semibold">AI is saying:</p>
                  <p className="italic">"{generatedTextToSpeak}"</p>
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
                  <MicIcon className="mr-2 h-4 w-4" />
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
                <div className="mt-4">
                  <Label>Recorded Audio:</Label>
                  <audio controls src={audioPreviewUrl} className="w-full mt-1">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {transcript && !sttLoading && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <Label className="font-semibold block mb-1">Transcript:</Label>
                  <p className="whitespace-pre-wrap">{transcript}</p>
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

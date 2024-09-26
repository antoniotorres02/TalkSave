import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Square } from 'lucide-react';

interface ExpensesVoiceDialogProps {
    onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpensesVoiceDialog: React.FC<ExpensesVoiceDialogProps> = ({ onAddExpense }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isLongPressRef = useRef(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingDuration((prev) => prev + 1);
            }, 1000);
        } else {
            setRecordingDuration(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioBlob(audioBlob);
                audioChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error al iniciar la grabación:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handlePressStart = () => {
        if (!isRecording) {
            startRecording();
        }
        isLongPressRef.current = false;
        pressTimerRef.current = setTimeout(() => {
            isLongPressRef.current = true;
        }, 1000);
    };

    const handlePressEnd = () => {
        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
        }
        if (isLongPressRef.current) {
            stopRecording();
        }
    };

    const handleClick = () => {
        if (!isLongPressRef.current) {
            if (isRecording) {
                stopRecording();
            } else {
                startRecording();
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4">Añadir con Voz</Button>
            </DialogTrigger>
            <DialogContent className='bg-background text-foreground dark:bg-background dark:text-foreground'>
                <DialogHeader>
                    <DialogTitle>Añadir Nuevo Gasto con Voz</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Presiona para iniciar/detener. Mantén presionado para grabar mientras mantienes.
                </DialogDescription>
                <div className="flex flex-col items-center my-4">
                    <Button 
                        onMouseDown={handlePressStart}
                        onMouseUp={handlePressEnd}
                        onTouchStart={handlePressStart}
                        onTouchEnd={handlePressEnd}
                        onClick={handleClick}
                        className={`rounded-full p-4 h-20 w-20 relative ${
                            isRecording ? 'before:absolute before:inset-0 before:rounded-full before:animate-ping before:bg-red-500 before:opacity-75' : ''
                        }`}
                    >
                        <Mic className="h-10 w-10" />
                    </Button>
                    {isRecording && (
                        <div className="mt-2 text-sm font-medium">
                            Grabando: {recordingDuration}s
                        </div>
                    )}
                </div>
                {audioBlob && !isRecording && (
                    <div className="mt-4">
                        <audio controls src={URL.createObjectURL(audioBlob)} className="w-full" />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ExpensesVoiceDialog;

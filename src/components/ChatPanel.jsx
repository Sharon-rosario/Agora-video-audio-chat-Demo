import React, { useEffect, useRef } from 'react';
import MessageWrapper from './chat/MessageWrapper';
import {ChatTheme} from '../constants/theme';

const dummyMessages = [
    { sender: 'Patient 1', type: 'text', content: 'Hi Dr. Smith! I’ve been feeling a bit off lately.', time: '9:00 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Sorry to hear that, Patient 1. Can you describe your symptoms?', time: '9:02 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'I’ve had a headache and some fatigue for a few days.', time: '9:05 AM', tagged: true },
    { sender: 'You', type: 'audio', content: { url: 'audio1.mp3', duration: '0:45' }, time: '9:07 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'Thanks for the voice note. I also have a slight fever.', time: '9:10 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Have you taken any medication or done any tests?', time: '9:12 AM', tagged: false },
    { sender: 'Patient 1', type: 'file', content: { url: 'blood_test.pdf', name: 'Blood_Test_Result.pdf' }, time: '9:15 AM', tagged: true },
    { sender: 'You', type: 'text', content: 'Thanks. I’ll review the blood test now.', time: '9:17 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'Also, here’s a picture of my medication.', time: '9:20 AM', tagged: false },
    { sender: 'Patient 1', type: 'doc', content: { url: 'medication_list.docx', name: 'Medication_List.docx' }, time: '9:21 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Got it. Can you confirm the dosage of Paracetamol?', time: '9:23 AM', tagged: true },
    { sender: 'Patient 1', type: 'text', content: 'It’s 500mg, twice daily.', time: '9:25 AM', tagged: false },
    { sender: 'You', type: 'video', content: { url: 'instruction.mp4', duration: '1:30' }, time: '9:28 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'Thanks for the video! That’s helpful.', time: '9:30 AM', tagged: false },
    { sender: 'You', type: 'audio', content: { url: 'doctor_note.mp3', duration: '0:20' }, time: '10:03 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Any other symptoms like cough or sore throat?', time: '9:32 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'Just a mild cough, nothing major.', time: '9:35 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Noted. I’ll prescribe something for that. Check this.', time: '9:37 AM', tagged: false },
    { sender: 'You', type: 'doc', content: { url: 'prescription.docx', name: 'Prescription.docx' }, time: '9:38 AM', tagged: true },
    { sender: 'You', type: 'text', content: 'Please refer to this guide before starting.', time: '10:00 AM', tagged: false },
    { sender: 'You', type: 'doc', content: { url: 'diet_chart.docx', name: 'Diet_Chart.docx' }, time: '10:04 AM', tagged: true },
    { sender: 'Patient 1', type: 'text', content: 'Got it. Should I start this today?', time: '9:40 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Yes, start today and let me know how you feel tomorrow.', time: '9:42 AM', tagged: false },
    { sender: 'Patient 1', type: 'audio', content: { url: 'audio2.mp3', duration: '0:05' }, time: '9:45 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Thanks for the update. I’ll check in tomorrow.', time: '9:47 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'Appreciate it, Dr. Smith!', time: '9:50 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'I forgot to mention I had some nausea this morning.', time: '9:52 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Let’s add an anti-nausea medication.', time: '9:55 AM', tagged: false },
    { sender: 'You', type: 'doc', content: { url: 'updated_prescription.docx', name: 'Updated_Prescription.docx' }, time: '9:56 AM', tagged: true },
    { sender: 'Patient 1', type: 'text', content: 'Thanks! I’ll pick it up later today.', time: '9:58 AM', tagged: false },
    { sender: 'You', type: 'video', content: { url: 'paracetamol_info.mp4', duration: '2:15' }, time: '10:02 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Here’s a video on how to manage nausea.', time: '10:03 AM', tagged: false },
    { sender: 'Patient 1', type: 'video', content: { url: 'symptom_video.mp4', duration: '0:40' }, time: '10:05 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'I recorded a short clip showing how I feel in the morning.', time: '10:06 AM', tagged: false },
    { sender: 'You', type: 'text', content: 'Thanks for the video. I’ll analyze it and get back shortly.', time: '10:07 AM', tagged: false },
    { sender: 'You', type: 'file', content: { url: 'treatment_plan.pdf', name: 'Treatment_Plan.pdf' }, time: '10:08 AM', tagged: true },
    { sender: 'You', type: 'text', content: 'Also attaching your updated treatment plan.', time: '10:09 AM', tagged: false },
    { sender: 'Patient 1', type: 'text', content: 'Thanks again! This was really helpful.', time: '10:10 AM', tagged: false }
  ];
  


  const ChatPanel = () => {
    const chatEndRef = useRef(null);
  
    // Auto‑scroll on new messages
    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [dummyMessages]);
  
    return (
      <div className="flex flex-col h-full">
        {/* Chat area */}
        <div
          className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500"
          style={{ backgroundColor: ChatTheme.panelBg }}
        >
          {dummyMessages.map((msg, i) => (
            <MessageWrapper key={i} message={msg} />
          ))}
          <div ref={chatEndRef} />
        </div>
  
        {/* Composer */}
        <div className="p-3 flex items-center shadow-md" style={{ backgroundColor: ChatTheme.footerBg }}>
          <input
            type="text"
            placeholder="Type a message…"
            className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none shadow-sm"
          />
          {/* Actions */}
          <button className="p-2 mx-2 text-gray-500 hover:text-gray-700">
            {/* Attachment icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656l-6.586 6.586a6 6 0 008.485 8.485l6.586-6.586" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            {/* Mic icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            {/* Send icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  
  export default ChatPanel;

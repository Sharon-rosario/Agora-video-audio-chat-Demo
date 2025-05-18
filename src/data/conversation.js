export const dummyMessages = [
  // Initial symptoms and response
  { id: '1', sender: 'Patient 1', type: 'text', content: 'I’ve been feeling unwell for a few days.', time: '9:00 AM', tagged: true },
  { id: '2', sender: 'Patient 1', type: 'text', content: 'I’ve had a headache and some fatigue.', time: '9:02 AM', tagged: true },
  { id: '3', sender: 'You', type: 'text', content: 'Thanks for letting me know. Can you share more details about your symptoms?', time: '9:05 AM', tagged: false, replyTo: '2' },
  { id: '4', sender: 'You', type: 'audio', content: { url: 'audio1.mp3', duration: '0:40' }, time: '9:06 AM', tagged: false },
  { id: '5', sender: 'Patient 1', type: 'text', content: 'Thanks for the voice note. I also have a slight fever.', time: '9:10 AM', tagged: false, replyTo: '4' },

  // Sharing test results
  { id: '6', sender: 'Patient 1', type: 'file', content: { url: 'blood_test.pdf', name: 'Blood_Test_Result.pdf' }, time: '9:12 AM', tagged: true },
  { id: '7', sender: 'You', type: 'text', content: 'Thanks. I’ll review the blood test now.', time: '9:15 AM', tagged: false, replyTo: '6' },
  { id: '8', sender: 'You', type: 'text', content: 'The results show a mild infection. Let’s discuss medication.', time: '9:20 AM', tagged: true },

  // Medication discussion
  { id: '9', sender: 'Patient 1', type: 'text', content: 'Okay, what medication do you recommend?', time: '9:22 AM', tagged: false, replyTo: '8' },
  { id: '10', sender: 'You', type: 'text', content: 'I’m prescribing Paracetamol for the fever. Can you confirm the dosage you’re taking?', time: '9:23 AM', tagged: true },
  { id: '11', sender: 'Patient 1', type: 'text', content: 'It’s 500mg, twice daily.', time: '9:25 AM', tagged: false, replyTo: '10' },
  { id: '12', sender: 'You', type: 'doc', content: { url: 'prescription.docx', name: 'Prescription.docx' }, time: '9:30 AM', tagged: true },
  { id: '13', sender: 'Patient 1', type: 'text', content: 'Got it. Should I start this today?', time: '9:32 AM', tagged: false, replyTo: '12' },
  { id: '14', sender: 'You', type: 'text', content: 'Yes, please start today. Also, here’s a video on managing fever.', time: '9:35 AM', tagged: false, replyTo: '13' },
  { id: '15', sender: 'You', type: 'video', content: { url: 'fever_management.mp4', duration: '1:00' }, time: '9:36 AM', tagged: false },
  { id: '16', sender: 'Patient 1', type: 'text', content: 'Thanks for the video! That’s helpful.', time: '9:40 AM', tagged: false, replyTo: '15' },

  // Additional symptoms and media
  { id: '17', sender: 'Patient 1', type: 'text', content: 'I’ve also been feeling nauseous in the mornings.', time: '9:45 AM', tagged: true },
  { id: '18', sender: 'Patient 1', type: 'video', content: { url: 'morning_nausea.mp4', duration: '0:45' }, time: '9:47 AM', tagged: false, replyTo: '17' },
  { id: '19', sender: 'You', type: 'text', content: 'Thanks for sharing the video. Let’s add an anti-nausea medication.', time: '9:50 AM', tagged: false, replyTo: '18' },
  { id: '20', sender: 'You', type: 'doc', content: { url: 'updated_prescription.docx', name: 'Updated_Prescription.docx' }, time: '9:55 AM', tagged: true },
  { id: '21', sender: 'You', type: 'text', content: 'Here’s a video on how to manage nausea.', time: '10:00 AM', tagged: false, replyTo: '17' },
  { id: '22', sender: 'You', type: 'video', content: { url: 'nausea_management.mp4', duration: '1:15' }, time: '10:01 AM', tagged: false },
  { id: '23', sender: 'Patient 1', type: 'text', content: 'The video was helpful. I also took a photo of my rash.', time: '10:05 AM', tagged: false, replyTo: '22' },
  { id: '24', sender: 'Patient 1', type: 'image', content: { url: 'https://tse2.mm.bing.net/th?id=OIP.V6ZzUtrwCcc-CWvquZUi8AHaJ3&pid=Api&P=0&h=180', name: 'Rash_Photo.png' }, time: '10:06 AM', tagged: true },

  // Diet and treatment plan
  { id: '25', sender: 'You', type: 'text', content: 'The rash looks concerning. I’m sending a diet chart to help with recovery.', time: '10:10 AM', tagged: false, replyTo: '24' },
  { id: '26', sender: 'You', type: 'doc', content: { url: 'diet_chart.docx', name: 'Diet_Chart.docx' }, time: '10:12 AM', tagged: true },
  { id: '27', sender: 'You', type: 'file', content: { url: 'treatment_plan.pdf', name: 'Treatment_Plan.pdf' }, time: '10:15 AM', tagged: true },
  { id: '28', sender: 'Patient 1', type: 'text', content: 'Thanks for the files. Can I share my recent test results?', time: '10:20 AM', tagged: false, replyTo: '27' },
  { id: '29', sender: 'Patient 1', type: 'file', content: { url: 'recent_tests.pdf', name: 'Recent_Tests.pdf' }, time: '10:22 AM', tagged: true },

  // Audio and video calls (afternoon)
  { id: '30', sender: 'You', type: 'text', content: 'Let’s discuss the test results over a call. I’ll call you now.', time: '12:00 PM', tagged: false, replyTo: '29' },
  { id: '31', sender: 'You', type: 'audioCall', content: { status: 'Received' }, time: '12:02 PM', tagged: false },
  { id: '32', sender: 'You', type: 'audioCall', content: { status: 'Rejected' }, time: '12:03 PM', tagged: false, replyTo: '31' },
  { id: '33', sender: 'Patient 1', type: 'text', content: 'Sorry, I missed the call. Can we try a video call instead?', time: '12:05 PM', tagged: false, replyTo: '32' },
  { id: '34', sender: 'You', type: 'videoCall', content: { status: 'Received' }, time: '12:10 PM', tagged: false },
  { id: '35', sender: 'You', type: 'videoCall', content: { status: 'Accepted', startTime: '12:10 PM' }, time: '12:10 PM', tagged: true },
  // Messages during the video call
  { id: '36', sender: 'You', type: 'text', content: 'Can you confirm if you’ve started the new medication?', time: '12:12 PM', tagged: false },
  { id: '37', sender: 'Patient 1', type: 'text', content: 'Yes, I started it this morning.', time: '12:14 PM', tagged: false, replyTo: '36' },
  { id: '38', sender: 'You', type: 'text', content: 'Great. Let’s monitor your symptoms for the next few days.', time: '12:16 PM', tagged: false, replyTo: '37' },
  { id: '39', sender: 'You', type: 'videoCall', content: { status: 'Ended', endTime: '12:20 PM' }, time: '12:20 PM', tagged: true },

  // Follow-up after the call
  { id: '40', sender: 'Patient 1', type: 'text', content: 'Thanks for the video call. I feel more confident now.', time: '12:25 PM', tagged: false, replyTo: '39' },
  { id: '41', sender: 'You', type: 'text', content: 'Glad to hear that. I’m sending an audio note with some additional advice.', time: '12:30 PM', tagged: false, replyTo: '40' },
  { id: '42', sender: 'You', type: 'audio', content: { url: 'advice_audio.mp3', duration: '0:05' }, time: '12:32 PM', tagged: true },
  { id: '43', sender: 'Patient 1', type: 'text', content: 'Got the audio. I’ll follow the advice. Here’s another photo of the rash—it’s changing.', time: '12:40 PM', tagged: false, replyTo: '42' },
  { id: '44', sender: 'Patient 1', type: 'image', content: { url: 'https://tse2.mm.bing.net/th?id=OIP.V6ZzUtrwCcc-CWvquZUi8AHaJ3&pid=Api&P=0&h=180', name: 'Updated_Rash_Photo.png' }, time: '12:42 PM', tagged: true },

  // Evening updates
  { id: '45', sender: 'You', type: 'text', content: 'The rash looks better, but let’s monitor it. Can you send a video of how you’re feeling?', time: '5:00 PM', tagged: false, replyTo: '44' },
  { id: '46', sender: 'Patient 1', type: 'video', content: { url: 'evening_update.mp4', duration: '1:10' }, time: '5:05 PM', tagged: true },
  { id: '47', sender: 'You', type: 'text', content: 'Thanks for the video. You seem to be improving. I’ll send an updated treatment plan.', time: '5:10 PM', tagged: false, replyTo: '46' },
  { id: '48', sender: 'You', type: 'file', content: { url: 'updated_treatment_plan.zip', name: 'Updated_Treatment_Plan.zip' }, time: '5:15 PM', tagged: true },
  { id: '49', sender: 'Patient 1', type: 'text', content: 'Got the zip file. I also have some documents to share.', time: '5:20 PM', tagged: false, replyTo: '48' },
  { id: '50', sender: 'Patient 1', type: 'doc', content: { url: 'patient_notes.docx', name: 'Patient_Notes.docx' }, time: '5:22 PM', tagged: true },

  // Another call attempt
  { id: '51', sender: 'You', type: 'text', content: 'Let’s have a quick audio call to go over the documents.', time: '6:00 PM', tagged: false, replyTo: '50' },
  { id: '52', sender: 'You', type: 'audioCall', content: { status: 'Received' }, time: '6:02 PM', tagged: false },
  { id: '53', sender: 'You', type: 'audioCall', content: { status: 'Accepted', startTime: '6:02 PM' }, time: '6:02 PM', tagged: true },
  // Messages during the audio call
  { id: '54', sender: 'You', type: 'text', content: 'I see you’ve noted some side effects. Can you describe them?', time: '6:04 PM', tagged: false },
  { id: '55', sender: 'Patient 1', type: 'text', content: 'I’ve had some mild dizziness since starting the medication.', time: '6:06 PM', tagged: false, replyTo: '54' },
  { id: '56', sender: 'You', type: 'text', content: 'Okay, that’s noted. We might need to adjust the dosage.', time: '6:08 PM', tagged: false, replyTo: '55' },
  { id: '57', sender: 'You', type: 'audioCall', content: { status: 'Ended', endTime: '6:10 PM' }, time: '6:10 PM', tagged: true },
  { id: '58', sender: 'Patient 1', type: 'text', content: 'Thanks for the call. I’ll follow the new instructions.', time: '6:15 PM', tagged: false, replyTo: '57' },

  // Final updates (evening)
  { id: '59', sender: 'You', type: 'text', content: 'Great. I’m sending a final set of documents for your records.', time: '8:00 PM', tagged: false, replyTo: '58' },
  { id: '60', sender: 'You', type: 'doc', content: { url: 'final_records.docx', name: 'Final_Records.docx' }, time: '8:02 PM', tagged: true },
  { id: '61', sender: 'Patient 1', type: 'text', content: 'Received the documents. I also zipped some logs for you.', time: '8:10 PM', tagged: false, replyTo: '60' },
  { id: '62', sender: 'Patient 1', type: 'file', content: { url: 'patient_logs.zip', name: 'Patient_Logs.zip' }, time: '8:12 PM', tagged: true },
  { id: '63', sender: 'You', type: 'text', content: 'Thanks for the logs. Here’s a tagged reply for your reference.', time: '8:15 PM', tagged: true, replyTo: '62' },
  { id: '64', sender: 'You', type: 'audio', content: { url: 'final_advice.mp3', duration: '0:30' }, time: '8:20 PM', tagged: false, replyTo: '62' },
  { id: '65', sender: 'Patient 1', type: 'text', content: 'Got the audio. I’ll rest now and update you tomorrow.', time: '8:25 PM', tagged: false, replyTo: '64' },

  // Final call attempt (near current time)
  { id: '66', sender: 'You', type: 'text', content: 'Before you rest, let’s have a quick video call to wrap up.', time: '10:00 PM', tagged: false, replyTo: '65' },
  { id: '67', sender: 'You', type: 'videoCall', content: { status: 'Received' }, time: '10:02 PM', tagged: false },
  { id: '68', sender: 'You', type: 'videoCall', content: { status: 'Rejected' }, time: '10:03 PM', tagged: false, replyTo: '67' },
  { id: '69', sender: 'Patient 1', type: 'text', content: 'Sorry, I’m too tired for a call. Can we do it tomorrow?', time: '10:05 PM', tagged: false, replyTo: '68' },
  { id: '70', sender: 'You', type: 'text', content: 'Of course, let’s schedule it for tomorrow morning.', time: '10:10 PM', tagged: true, replyTo: '69' },
  { id: '71', sender: 'Patient 1', type: 'text', content: 'Sounds good. Good night!', time: '10:15 PM', tagged: false, replyTo: '70' },
  { id: '72', sender: 'You', type: 'text', content: 'Good night! Feel better.', time: '10:20 PM', tagged: false, replyTo: '71' },
];
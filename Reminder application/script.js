// script.js

// Reference to the reminder message paragraph and audio
const reminderMessage = document.getElementById('reminderMessage');
const chime = document.getElementById('chime');

// Event listener for form submission
document.getElementById('reminderForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission to server
    
    const selectedDay = document.getElementById('day').value;
    const selectedTime = document.getElementById('time').value;
    const selectedActivity = document.getElementById('activity').value;

    // Calculate the current day and time
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentTime = now.toTimeString().slice(0, 5);

    // Display reminder message
    reminderMessage.textContent = ('Reminder set for  ${selectedActivity} on ${selectedDay} at ${selectedTime}.');

    // Set a timeout to trigger the reminder at the selected time
    setReminder(selectedDay, selectedTime, selectedActivity);
});

// Function to set the reminder
function setReminder(day, time, activity) {
    const now = new Date();
    const targetDay = getDayIndex(day);
    const targetTime = time.split(":");
    
    const reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetTime[0], targetTime[1]);
    
    // If the selected day is ahead of the current day, adjust the reminder date
    if (targetDay !== now.getDay()) {
        reminderDate.setDate(reminderDate.getDate() + (targetDay - now.getDay() + 7) % 7);
    }
    
    const timeDifference = reminderDate - now;

    if (timeDifference > 0) {
        setTimeout(() => {
            reminderMessage.textContent = 'It s time for ${activity}!';
            chime.play();
        }, timeDifference);
    } else {
        reminderMessage.textContent = 'Selected time is in the past! Please choose a future time.';
    }
}

// Utility function to convert day of the week to a number (0-6)
function getDayIndex(day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days.indexOf(day);
}
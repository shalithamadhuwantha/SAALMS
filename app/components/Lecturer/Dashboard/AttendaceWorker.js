// public/attendanceWorker.js
self.onmessage = (event) => {
    const { students } = event.data;

    setInterval(() => {
        let present = 0;
        let absent = 0;

        students.forEach((student) => {
            if (student.attendance === "🟢") {
                present++;
            } else if (student.attendance === "🔴") {
                absent++;
            }
        });

        // Send the counts back to the main thread
        postMessage({ present, absent });
    }, 5000); // Runs every 5 seconds
};

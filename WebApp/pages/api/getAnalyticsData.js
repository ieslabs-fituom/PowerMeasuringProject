import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        // Get the date before 30 days from the provided date
        let givenDate = req.body.givenDate; // Assuming the date format is 'YYYY-MM-DD'
        let thirtyDaysAgo = new Date(givenDate);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const result = await excuteQuery({
            query: 'SELECT * FROM records WHERE device_id = ? AND start_time >= ?',
            values: [req.body.deviceId, thirtyDaysAgo.toISOString().split('T')[0]],
        });
        
        let sevenDaysAgo = new Date(givenDate);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        let todayDuration = 0;
        let lastSevenDaysDuration = 0;
        let lastThirtyDaysDuration = 0;

        result.forEach((record) => {
            let startTime = new Date(record.start_time);
            let endTime = new Date(record.end_time);

            if (startTime.toISOString().split('T')[0] === givenDate) {
                todayDuration += (endTime - startTime) / 1000;
            }

            if (startTime >= sevenDaysAgo) {
                lastSevenDaysDuration += (endTime - startTime) / 1000;
            }

            lastThirtyDaysDuration += (endTime - startTime) / 1000;
        });

        // Convert above todayDuration, lastSevenDaysDuration, lastThirtyDaysDuration to hours, minutes and seconds
        let todayDurationOnlyHours = (todayDuration / 3600).toFixed(2);
        let todayDurationHours = Math.floor(todayDuration / 3600);
        let todayDurationMinutes = Math.floor((todayDuration % 3600) / 60);
        let todayDurationSeconds = Math.floor((todayDuration % 3600) % 60);
        todayDuration = `${todayDurationHours}H ${todayDurationMinutes}M ${todayDurationSeconds}S`;

        let lastSevenDaysDurationHours = Math.floor(lastSevenDaysDuration / 3600);
        let lastSevenDaysDurationMinutes = Math.floor((lastSevenDaysDuration % 3600) / 60);
        let lastSevenDaysDurationSeconds = Math.floor((lastSevenDaysDuration % 3600) % 60);
        lastSevenDaysDuration = `${lastSevenDaysDurationHours}H ${lastSevenDaysDurationMinutes}M ${lastSevenDaysDurationSeconds}S`;

        let lastThirtyDaysDurationHours = Math.floor(lastThirtyDaysDuration / 3600);
        let lastThirtyDaysDurationMinutes = Math.floor((lastThirtyDaysDuration % 3600) / 60);
        let lastThirtyDaysDurationSeconds = Math.floor((lastThirtyDaysDuration % 3600) % 60);
        lastThirtyDaysDuration = `${lastThirtyDaysDurationHours}H ${lastThirtyDaysDurationMinutes}M ${lastThirtyDaysDurationSeconds}S`;

        res.status(200).json({ todayDurationOnlyHours, todayDuration, lastSevenDaysDuration, lastThirtyDaysDuration });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

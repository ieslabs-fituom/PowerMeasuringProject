import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        let queryType = req.body.queryType; // 1 for get deives by device_id, 2 for get devices by user, 3 for get devices by mac_address
        let query = '';
        let values = [];
        if (queryType == 1) {
            query = 'SELECT * FROM device WHERE device_id = ?';
            values = [req.body.deviceId];
        }
        else if (queryType == 2) {
            query = 'SELECT * FROM device WHERE user = ?';
            values = [req.body.userId];
        } else if (queryType == 3) {
            query = 'SELECT device_id, device_threshold FROM device WHERE device_mac = ?';
            values = [req.body.macAddress];
        }

        const result = await excuteQuery({
            query: query,
            values: values,
        });

        if (result.error) {
            console.log(result.error);
            return res.status(201).json({ error: result.error });
        } else {
            console.log(result);
            return res.status(200).json({ result });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
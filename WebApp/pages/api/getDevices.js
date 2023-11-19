import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        let queryType = req.body.queryType; // 1 for get deives by device_id, 2 for get devices by user
        let query = '';
        let values = [];
        if (queryType == 1) {
            query = 'SELECT * FROM device WHERE device_id = ?';
            values = [req.body.deviceId];
        }
        else if (queryType == 2) {
            query = 'SELECT * FROM device WHERE user = ?';
            values = [req.body.userId];
        }
        const result = await excuteQuery({
            query: query,
            values: values,
        });
        //console.log("Result: ",result)
        res.status(200).json({ result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
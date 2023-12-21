import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: 'SELECT COUNT(record_id) FROM records WHERE device_id = ?',
            values: req.body.deviceId,
        });
        
        if(result.error) {
            return res.status(201).json({ error: result.error });
        } else{
            return res.status(200).json({ result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
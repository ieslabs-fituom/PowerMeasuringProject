import excuteQuery from '../../db'

export default async (req, res) => {
    try {
        let queryType = req.body.queryType; // 1 for get device types by type_id, 2 for get device_types by user
        let query = '';
        let values = [];
        if (queryType == 1) {
            query = 'SELECT * FROM device_type WHERE type_id = ?';
            values = [req.body.typeId];
        }
        else if (queryType == 2) {
            query = 'SELECT * FROM device_type WHERE user = ?';
            values = [req.body.userId];
        }
        const result = await excuteQuery({
            query: query,
            values: values,
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
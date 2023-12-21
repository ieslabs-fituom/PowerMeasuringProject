import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        let deviceTypeID = req.body.deviceTypeId;

        let query = 'DELETE FROM device_type WHERE type_id = ?';
        let values = [deviceTypeID];
        
        const result = await excuteQuery({
            query: query,
            values: values,
        });

        console.log(result);
        if (result && result.affectedRows > 0) {
            res.status(200).json({ result });
        } else {
            res.status(500).json({ result });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({ error });
    }
}
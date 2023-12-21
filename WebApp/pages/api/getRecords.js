import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        console.log("DATA LOADING, PAGE : ", req.body.page);
        const currentPage = req.body.page || 1; // Get the current page from the request query, default to page 1 if not provided
        const recordsPerPage = 3;
        const offset = (currentPage - 1) * recordsPerPage;
        
        const result = await excuteQuery({
            query: 'SELECT * FROM records WHERE device_id = ? ORDER BY record_id DESC LIMIT ? OFFSET ?',
            values: [req.body.deviceId, recordsPerPage, offset],
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

import { connectDB, disconnectDB, YourModel } from './checklistsModel';


export default async function handler(req, res) {
    console.log('selectedSubTask req.body: ', req.body)
    if (req.method === 'POST') {
        // check if checklist_request is empty
        
        const parent_id = req.body.id_parent;
        const task = req.body.task;

        var subtasks = [];
        
        await connectDB();

        // check if connected to the database
        console.log('connected to the database');


        try {
            subtasks = await YourModel.find({ id_parent: parent_id, name: task });
    
            // Render the subtasks
            // return subtasks.map((subtask) => (
            //     <div key={subtask._id}>
            //         <h3>{subtask.name}</h3>
            //         {subtask.tasklist.map((task) => (
            //             <p>{task}</p>
            //         ))}
            //     </div>
            // ));
        } catch (error) {
            console.log('Error fetching subtasks:', error);
        } finally {
            await disconnectDB();
        }

        // NEED TO CHECK IF SUBTASKS WERE CREATED BY THE SAME USER - VERY LIKELY THOUGH
        // if (email !== newDocument[0].email) {
        return res.status(200).json({
            "subtasks": subtasks
        });


    }


}
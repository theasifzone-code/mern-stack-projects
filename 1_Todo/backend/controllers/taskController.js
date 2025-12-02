import Task from "../models/taskModel.js";

// utility function to get owner id and field dynamically
const getOwnerInfo = (req)=>{
     const ownerField = req.user ? "user" : req.apiKey ? "apiKey" : null;
     const ownerId = req.user ? req.user._id : req.apiKey ? req.apiKey._id : null;
     return {ownerField, ownerId};
}

// Add new task
const createTask = async (req, res) => {
  try {
    const { title,completed } = req.body;
    const {ownerField, ownerId} = getOwnerInfo(req);

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if(!ownerField){
        return res.status(401).json({ message: "Unauthorized request: owner not identified" });
    }

    const taskData = { 
      title, 
       completed: completed ?? false, 
      [ownerField]: ownerId  // dynamic key: set user or apiKey
    };

    // Create task
    const task = await Task.create(taskData);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    if(error.name === "ValidationError"){
        return res.status(400).json({ message: "Validation error", error: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all tasks
const getTasks = async (req, res) => {
  try {
   const {ownerField, ownerId} = getOwnerInfo(req);
    if(!ownerField){
        return res.status(401).json({ message: "Unauthorized request: owner not identified" });
    }
    
    const filter = {[ownerField]: ownerId}; // dynamic key: set user or apiKey

    const tasks = await Task.find(filter);
    res.json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update task
const updateTask = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const {ownerField, ownerId} = getOwnerInfo(req);

    if (!ownerField){
        return res.status(401).json({ message: "Unauthorized request: owner not identified" });
    }
    
    if(!title && completed === undefined){
        return res.status(400).json({ message: "No data provided for update" });
    }


   const updatedTask = await Task.findOneAndUpdate( // find and update
      { 
        _id: req.params.id,
         [ownerField]: ownerId // dynamic key: set user or apiKey
      }, 
      // set only the fields which are provided
      { 
        $set: { 
        ...(title && { title }), // if title is provided
         ...(completed !== undefined && { completed })  // if completed is provided
        } 
      },
      { new: true, runValidators: true }  // return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or not authorized to update" });
    }

    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete task
const deleteTask = async (req, res) => {
  try {
    const {ownerField, ownerId} = getOwnerInfo(req);

    if(!ownerField){
        return res.status(401).json({ message: "Unauthorized request: owner not identified" });
    }

   
    const taskRemoved = await Task.findByIdAndDelete({
      _id: req.params.id,
      [ownerField]: ownerId  // Authorization check
    });

    res.json({ message: "Task removed successfully", taskRemoved });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createTask, getTasks, updateTask, deleteTask };

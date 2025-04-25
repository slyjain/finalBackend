import Canvas from "../models/canvasModel.js";
export const getUserCanvases = async (req, res) => {
    try {
        const userId = req.user.id;
        const canvases = await Canvas.find({
            $or: [{ owner: userId }, { shared: userId }]
        }, 'name').sort({ createdAt: -1 });
        res.json(canvases);
    }
    catch (e) {
        res.status(500).json({ error: "Failed to fetch canvases", details: e.message });
    }
}
export const loadCanvas = async (req, res) => {
    try {
        const userId = req.user.id;
        const canvasId = req.params.id;
        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }
        if (canvas.owner.toString() != userId && !canvas.shared.includes(userId)) {
            res.status(403).json({ error: "Unauthorised to access this canvas" });
        }
        res.json(canvas);

    } catch (error) {
        res.status(500).json({ error: "Failed to load canvas", details: error.message })
    }
}
export const createCanvas = async (req, res) => {
    try {
        const userId = req.user.id;
        const canvasName = req.body.name;
        console.log(userId);
        const newCanvas = new Canvas({
            name: canvasName,
            owner: userId,
            shared: [],
            elements: []
        })
        await newCanvas.save();
        res.status(201).json({ message: "Canvas created successfully", canvasId: newCanvas._id });
    } catch (error) {
        res.status(500).json({ error: "Failed to create canvas", details: error.message });
    }
}
export const updateCanvas = async (req, res) => {
    try {
        console.log("update canvas hit");

        const { canvasId, elements } = req.body;
        const userId = req.user.id;

        console.log("canvas id: ", canvasId);

        if (!canvasId) {
            return res.status(400).json({ error: "canvasId is required" });
        }

        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }

        if (canvas.owner.toString() !== userId && !canvas.shared.includes(userId)) {
            return res.status(403).json({ error: "Unauthorised to update canvas" });
        }

        canvas.elements = elements;
        await canvas.save();

        console.log("Canvas saved");
        res.status(200).json({ message: "Canvas saved successfully" });
    } catch (error) {
        console.error("Error updating canvas:", error);
        res.status(500).json({ error: "Failed to update Canvas", details: error.message });
    }
};

export const deleteCanvas = async (req, res) => {
    try {
        const canvasId = req.params.id;
        const userId = req.user.id;

        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }
        console.log("Canvas Owner:", canvas.owner.toString());
        console.log("Request User:", userId);

        if (canvas.owner.toString() !== userId) {
            return res.status(403).json({ error: "Only the owner can delete this canvas" });
        }

        await Canvas.findByIdAndDelete(canvasId);
        res.json({ message: "Canvas deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete canvas", details: error.message });
    }
}
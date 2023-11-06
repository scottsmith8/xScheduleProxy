import axios from "axios";
import express, { Request, Response } from "express";
import { PlaylistStep, xSchedulePlaylistRespont } from "../models/xSchedule";

// keep a map of ID to step name
// means we inject a safe string into xSxhedule's API over user input
let validSteps: PlaylistStep[] = []

export const xScheduleRouter = express.Router();

/**
 * Get the items in playlist Main
 */
xScheduleRouter.get("/getPlayLists", async (req: Request, res: Response) => {
    try {
        const options = {
            method: 'GET',
            url: 'http://localhost:8080/xScheduleQuery',
            params: { Query: 'GetPlayListSteps', Parameters: 'Main' },
            headers: {
            },
        };
        const result = await axios
            .request<xSchedulePlaylistRespont>(options)

        // poor mans cache :P
        if (validSteps.length !== result.data.steps.length) {
            validSteps = result.data.steps
        }
        res.status(200).send(result.data.steps);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


 /**
  * Request a song
  */
xScheduleRouter.get("/queuePlaylistItem", async (req: Request, res: Response) => {
    try {
        // convert step id to song name
        const stepId = req.query.stepId
        const step = validSteps.find(s => s.id === stepId)
        if (!step) {
            throw { message: 'step not found' }
        }

        // send it
        const options = {
            method: 'GET',
            url: `http://localhost:8080/xScheduleCommand?Command=Enqueue%20playlist%20step&Parameters=Main,${step.name}`,
            headers: {
            },
        };
        const result = await axios
            .request<xSchedulePlaylistRespont>(options)
        res.status(200).send(result.data);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
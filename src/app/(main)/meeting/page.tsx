"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { generateMeetingToken } from "@/store/slices/meetingSlice";
import AgoraRTC from "agora-rtc-sdk-ng";


const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

const Meetings = () => {
    const dispatch = useAppDispatch();
    const {meetingData, loading} = useAppSelector((state) => state.meeting);

    useEffect(() => {
        dispatch(
            generateMeetingToken({
                channelName: "uiux-class-room",
                uid: 12345,
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (!meetingData?.token) return;

        const joinMeeting = async () => {
            await client.join(
                meetingData.appId,
                meetingData.channelName,
                meetingData.token,
                12345
            );

            const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
            await client.publish(tracks);
            tracks[1].play("local-player");
        };

        joinMeeting();
    }, [meetingData]);

    console.log("meetingData", meetingData);

    // useEffect(() => {
    //     const checkDevices = async () => {
    //         const devices = await AgoraRTC.getDevices();
    //         console.log("devices", devices);
    //     };

    //     checkDevices();
    // }, []);

    return (
        <div className="pt-37.5 pb-16">
            <div className="max-w-container mx-auto">
                <h1 className="text-xl font-bold mb-3">Video Call</h1>
                <div
                    id="local-player"
                    className="w-[500px] h-[400px] bg-gray-200"
                />
            </div>
        </div>
    );
};

export default Meetings;
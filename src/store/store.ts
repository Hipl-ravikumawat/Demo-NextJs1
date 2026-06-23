import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import homeReducer from "./slices/homeSlice";
import blogReducer from "./slices/blogSlice";
import membershipReducer from "./slices/memberShipSlice";
import profileReducer from "./slices/profileSlice";
import coursesReducer from "./slices/coursesSlice";
import newsletterReducer from "./slices/newsletterSlice";
import searchReducer from "./slices/searchSlice";
import literatureCourseReducer from "./slices/literatureCourseSlice";
import meetingReducer from "./slices/meetingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
        blog: blogReducer,
        membership: membershipReducer,
        profile: profileReducer,
        courses: coursesReducer,
        newsletter: newsletterReducer,
        search: searchReducer,
        literatureCourse: literatureCourseReducer,
        meeting: meetingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
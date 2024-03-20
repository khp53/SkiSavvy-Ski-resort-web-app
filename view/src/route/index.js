import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import SkiLayout from "@/pages/SkiLayout";
import About from '@/pages/About'
import Contact from "@/pages/Contact";
import Map from "@/pages/Map";

import '../pages/Map/map.css';

const route = createBrowserRouter([
    {
        path: '/',
        element: <SkiLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/map',
                element: <Map />
            }
        ]
    }
])

export default route
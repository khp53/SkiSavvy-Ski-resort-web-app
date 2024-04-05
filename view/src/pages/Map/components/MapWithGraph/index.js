import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { ImageOverlay, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import '@elfalem/leaflet-curve';
import imageUrl from '@/assets/map_bg.svg'
import imageUrl1 from '@/assets/resortBackground.jpg'
import 'leaflet/dist/leaflet.css';


const MapWithGraph = forwardRef((props, ref) => {

    //get father component's function
    const { getStartNodeId, getEndNodeId } = props

    const [startNodeId, setStartNodeId] = useState(null);
    const [endNodeId, setEndNodeId] = useState(null);
    const [shortestPath, setShortestPath] = useState([]);

    //if father(Map) component click reset buttom, remove the startNodeId
    const resetStart = () => {
        setStartNodeId(null)
    }

    //if father component click reset buttom, remove the endNodeId
    const resetEnd = () => {
        setEndNodeId(null)
    }

    //back the function to the father component
    useImperativeHandle(ref, () => ({
        resetStart,
        resetEnd,
    }));

    // const map = useMap();

    const map = useMapEvents({
        dragend: (event) => {
            const map = event.target;
            const zoomLevel = map.getZoom();

            if (zoomLevel <= 2) {
                // Reset the position of the image overlay to the center
                map.setView([66, 375], 2);
            }
        }
    });


    const graphData1 = {
        "nodes": [
            { "id": 1, "title": "A", "latLng": [12, 270] },
            { "id": 2, "title": "B", "latLng": [20, 300] },
            { "id": 3, "title": "C", "latLng": [55, 255] },
            { "id": 4, "title": "D", "latLng": [75, 290] },
            { "id": 5, "title": "E", "latLng": [60, 275] },
            { "id": 6, "title": "F", "latLng": [65, 292] },
            { "id": 7, "title": "G", "latLng": [62, 314] },
            { "id": 8, "title": "H", "latLng": [74, 293] },
            { "id": 9, "title": "I", "latLng": [73, 328] },
            { "id": 10, "title": "J", "latLng": [55, 316] },
            { "id": 11, "title": "K", "latLng": [25, 340] },
            { "id": 12, "title": "L", "latLng": [60, 330] },
            { "id": 13, "title": "M", "latLng": [65, 350] },
            { "id": 14, "title": "N", "latLng": [63, 365] },
            { "id": 15, "title": "O", "latLng": [52, 365] },
            { "id": 16, "title": "P", "latLng": [58, 370] },
            { "id": 17, "title": "Q", "latLng": [70, 400] },
            { "id": 18, "title": "R", "latLng": [59, 377] },
            { "id": 19, "title": "S", "latLng": [71, 410] },
            { "id": 20, "title": "T", "latLng": [75, 340] },
            { "id": 21, "title": "U", "latLng": [74, 360] },
            { "id": 22, "title": "V", "latLng": [79, 350] },
            { "id": 23, "title": "W", "latLng": [76, 364] },
            { "id": 24, "title": "X", "latLng": [77, 374] },
            { "id": 25, "title": "Y", "latLng": [76, 400] },
            { "id": 26, "title": "Z", "latLng": [77, 415] },
            { "id": 27, "title": "AA", "latLng": [75, 422] },
            { "id": 28, "title": "AB", "latLng": [77, 490] },
            { "id": 29, "title": "AC", "latLng": [70, 490] },
            { "id": 30, "title": "AD", "latLng": [12, 490] },
            { "id": 31, "title": "AE", "latLng": [65, 477] },
            { "id": 32, "title": "AF", "latLng": [66, 467] },
            { "id": 33, "title": "AG", "latLng": [55, 470] },
            { "id": 34, "title": "AH", "latLng": [60, 460] },
            { "id": 35, "title": "AI", "latLng": [56, 405] },
            { "id": 36, "title": "AJ", "latLng": [50, 385] }
        ],
        "edges": [
            {
                "id": 1, "direction": { "source": 2, "target": 1 }, "latLngs": [[20, 300], [12, 270]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "20 FIS - Abfahrt",
                    "additional-info": {
                        "length": 2150,
                        "length-open": 0
                    },
                    "oid": "30433",
                    "status": "open",
                    "id": "81538",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 2, "direction": { "source": 3, "target": 2 }, "latLngs": [[55, 255], [20, 300]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "31 Skiweg zur Turrachbahn",
                    "additional-info": {
                        "length": 2100,
                        "length-open": 0
                    },
                    "oid": "30421",
                    "status": "closed",
                    "id": "81549",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 3, "direction": { "source": 4, "target": 3 }, "latLngs": [[75, 290], [55, 255]], "type": "slope",
                "isMultipleEdges": true,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "24 Weitentalabfahrt",
                    "additional-info": {
                        "length": 1400,
                        "length-open": 0
                    },
                    "oid": "30441",
                    "status": "open",
                    "id": "81542",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 4, "direction": { "source": 3, "target": 4 }, "latLngs": [[55, 255], [75, 290]], "type": "lift",
                "isMultipleEdges": true,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Weitentallift",
                    "oid": "29862",
                    "status": "open",
                    "id": "8157",
                    "subtitle": "T-bar",
                    "clients-sub-id": 2607
                },
            },
            {
                "id": 5, "direction": { "source": 5, "target": 6 }, "latLngs": [[60, 275], [65, 292]], "type": "lift",
                "isMultipleEdges": true,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Seitensprunglift",
                    "oid": "29867",
                    "status": "open",
                    "id": "81512",
                    "subtitle": "T-bar",
                    "clients-sub-id": 2607
                },
            },
            {
                "id": 6, "direction": { "source": 6, "target": 5 }, "latLngs": [[65, 292], [60, 275]], "type": "slope",
                "isMultipleEdges": true,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "36 Alibi für Seitensprung",
                    "additional-info": {
                        "length": 650,
                        "length-open": 0
                    },
                    "oid": "30429",
                    "status": "open",
                    "id": "81554",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 7, "direction": { "source": 7, "target": 2 }, "latLngs": [[62, 314], [20, 300]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "20 FIS - Abfahrt",
                    "additional-info": {
                        "length": 2150,
                        "length-open": 0
                    },
                    "oid": "30433",
                    "status": "open",
                    "id": "81538",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 8, "direction": { "source": 6, "target": 5 }, "latLngs": [[65, 292], [62, 314]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "22 Seitensprung",
                    "additional-info": {
                        "length": 800,
                        "length-open": 0
                    },
                    "oid": "30437",
                    "status": "open",
                    "id": "81540",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 9, "direction": { "source": 1, "target": 7 }, "latLngs": [[12, 270], [62, 314]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Turrachbahn",
                    "oid": "29858",
                    "status": "open",
                    "id": "8152",
                    "subtitle": "6-chair lift",
                    "clients-sub-id": 2605
                },
            },
            {
                "id": 10, "direction": { "source": 6, "target": 1 }, "latLngs": [[65, 292], [12, 270]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "21 Eisenhutabfahrt",
                    "additional-info": {
                        "length": 1550,
                        "length-open": 0
                    },
                    "oid": "30436",
                    "status": "open",
                    "id": "81539",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 11, "direction": { "source": 4, "target": 8 }, "latLngs": [[75, 290], [74, 293]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "23 Schwarzseeabfahrt",
                    "additional-info": {
                        "length": 1450,
                        "length-open": 0
                    },
                    "oid": "30440",
                    "status": "open",
                    "id": "81541",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 12, "direction": { "source": 9, "target": 7 }, "latLngs": [[73, 328], [62, 314]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "32 Skiweg zur Sonnenbahn",
                    "additional-info": {
                        "length": 1250
                    },
                    "oid": "30424",
                    "status": "open",
                    "id": "81550",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 13, "direction": { "source": 9, "target": 8 }, "latLngs": [[73, 328], [74, 293]], "type": "lift",
                "isMultipleEdges": true,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Sonnenbahn",
                    "oid": "29856",
                    "status": "open",
                    "id": "8154",
                    "subtitle": "2-chair lift",
                    "clients-sub-id": 2602
                },
            },
            {
                "id": 14, "direction": { "source": 8, "target": 9 }, "latLngs": [[74, 293], [73, 328]], "type": "slope",
                "isMultipleEdges": true,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "23 Schwarzseeabfahrt",
                    "additional-info": {
                        "length": 1450,
                        "length-open": 0
                    },
                    "oid": "30440",
                    "status": "open",
                    "id": "81541",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 15, "direction": { "source": 7, "target": 10 }, "latLngs": [[62, 314], [55, 316]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "19 Zirbenwaldabfahrt",
                    "additional-info": {
                        "length": 1200,
                        "length-open": 0
                    },
                    "oid": "30432",
                    "status": "open",
                    "id": "81537",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 16, "direction": { "source": 10, "target": 11 }, "latLngs": [[55, 316], [25, 340]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "19 Zirbenwaldabfahrt",
                    "additional-info": {
                        "length": 1200,
                        "length-open": 0
                    },
                    "oid": "30432",
                    "status": "open",
                    "id": "81537",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 17, "direction": { "source": 11, "target": 12 }, "latLngs": [[25, 340], [60, 330]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Zirbenwaldbahn",
                    "oid": "29859",
                    "status": "open",
                    "id": "8153",
                    "subtitle": "6-chair lift",
                    "clients-sub-id": 2605
                },
            },
            {
                "id": 18, "direction": { "source": 14, "target": 13 }, "latLngs": [[63, 365], [65, 350]], "type": "lift",
                "isMultipleEdges": true,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Wildkopflift",
                    "oid": "29864",
                    "status": "open",
                    "id": "8159",
                    "subtitle": "6-chair lift",
                    "clients-sub-id": 2605
                },
            },
            {
                "id": 19, "direction": { "source": 13, "target": 14 }, "latLngs": [[65, 350], [63, 365]], "type": "slope",
                "isMultipleEdges": true,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "26 Wildkopfabfahrt",
                    "additional-info": {
                        "length": 700
                    },
                    "oid": "30416",
                    "status": "open",
                    "id": "81544",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 20, "direction": { "source": 14, "target": 10 }, "latLngs": [[63, 365], [55, 316]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "27 Skiweg zum Wildkopflift",
                    "additional-info": {
                        "length": 1000
                    },
                    "oid": "30419",
                    "status": "open",
                    "id": "81545",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 21, "direction": { "source": 12, "target": 15 }, "latLngs": [[60, 330], [52, 365]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "18 Märchenwaldabfahrt",
                    "additional-info": {
                        "length": 1900,
                        "length-open": 0
                    },
                    "oid": "30413",
                    "status": "open",
                    "id": "81536",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 22, "direction": { "source": 15, "target": 11 }, "latLngs": [[52, 365], [25, 340]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "18 Märchenwaldabfahrt",
                    "additional-info": {
                        "length": 1900,
                        "length-open": 0
                    },
                    "oid": "30413",
                    "status": "open",
                    "id": "81536",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 23, "direction": { "source": 16, "target": 15 }, "latLngs": [[58, 370], [52, 365]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "28 Skiweg zur Zirbenwaldbahn",
                    "additional-info": {
                        "length": 300,
                        "length-open": 0
                    },
                    "oid": "30417",
                    "status": "closed",
                    "id": "81546",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 24, "direction": { "source": 17, "target": 9 }, "latLngs": [[70, 400], [73, 328]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Übungswiesenlift",
                    "oid": "29863",
                    "status": "open",
                    "id": "8158",
                    "subtitle": "T-bar",
                    "clients-sub-id": 2607
                },
                "status": "open",
            },
            {
                "id": 25, "direction": { "source": 17, "target": 14 }, "latLngs": [[70, 400], [63, 365]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "5 Engländerabfahrt",
                    "additional-info": {
                        "length": 300,
                        "length-open": 0
                    },
                    "oid": "30438",
                    "status": "open",
                    "id": "81523",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 26, "direction": { "source": 16, "target": 18 }, "latLngs": [[58, 370], [59, 377]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Maulwurf",
                    "oid": "29868",
                    "status": "open",
                    "id": "81513",
                    "subtitle": "T-bar",
                    "clients-sub-id": 2607
                },
            },
            {
                "id": 27, "direction": { "source": 18, "target": 17 }, "latLngs": [[59, 377], [70, 400]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Engländerlift",
                    "oid": "29865",
                    "status": "open",
                    "id": "81510",
                    "subtitle": "T-bar",
                    "clients-sub-id": 2607
                },
            },
            {
                "id": 28, "direction": { "source": 19, "target": 18 }, "latLngs": [[71, 410], [59, 377]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "1 Kornockabfahrt",
                    "additional-info": {
                        "length": 2350
                    },
                    "oid": "30430",
                    "status": "open",
                    "id": "81519",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 29, "direction": { "source": 21, "target": 20 }, "latLngs": [[74, 360], [75, 340]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Ottifantenlift",
                    "oid": "29869",
                    "status": "open",
                    "id": "81514",
                    "subtitle": "T-bar",
                    "clients-sub-id": 2607
                },
            },
            {
                "id": 30, "direction": { "source": 20, "target": 17 }, "latLngs": [[75, 340], [70, 400]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "6 Übungswiesenabfahrt links",
                    "additional-info": {
                        "length-open": 0
                    },
                    "oid": "30439",
                    "status": "open",
                    "id": "81524",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 31, "direction": { "source": 22, "target": 23 }, "latLngs": [[79, 350], [76, 364]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "12 Panoramaabfahrt",
                    "additional-info": {
                        "length": 950,
                        "length-open": 0
                    },
                    "oid": "30444",
                    "status": "open",
                    "id": "81530",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 32, "direction": { "source": 23, "target": 20 }, "latLngs": [[76, 364], [75, 340]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "13 Ländereckabfahrt",
                    "additional-info": {
                        "length-open": 0
                    },
                    "oid": "30422",
                    "status": "open",
                    "id": "81531",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 33, "direction": { "source": 24, "target": 22 }, "latLngs": [[77, 374], [79, 350]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Panoramabahn",
                    "oid": "29860",
                    "status": "open",
                    "id": "8155",
                    "subtitle": "Kombibahn",
                    "clients-sub-id": 2624
                },
            },
            {
                "id": 34, "direction": { "source": 24, "target": 23 }, "latLngs": [[77, 374], [76, 364]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "13 Ländereckabfahrt",
                    "additional-info": {
                        "length-open": 0
                    },
                    "oid": "30422",
                    "status": "open",
                    "id": "81531",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 35, "direction": { "source": 23, "target": 19 }, "latLngs": [[76, 364], [71, 410]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "8 Alibi - für Panoramabahn",
                    "additional-info": {
                        "length-open": 0
                    },
                    "oid": "30415",
                    "status": "open",
                    "id": "81526",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 36, "direction": { "source": 27, "target": 26 }, "latLngs": [[75, 422], [77, 415]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Hüttenexpress",
                    "oid": "29866",
                    "status": "open",
                    "id": "81511",
                    "subtitle": "T-bar",
                    "clients-sub-id": 2607
                },
            },
            {
                "id": 37, "direction": { "source": 26, "target": 25 }, "latLngs": [[77, 415], [76, 400]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "9 Abfahrt Hüttenexpress",
                    "additional-info": {
                        "length-open": 0
                    },
                    "oid": "30443",
                    "status": "open",
                    "id": "81527",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 38, "direction": { "source": 25, "target": 27 }, "latLngs": [[76, 400], [75, 422]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "9 Abfahrt Hüttenexpress",
                    "additional-info": {
                        "length-open": 0
                    },
                    "oid": "30443",
                    "status": "open",
                    "id": "81527",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 39, "direction": { "source": 27, "target": 19 }, "latLngs": [[75, 422], [71, 410]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "1 Kornockabfahrt",
                    "additional-info": {
                        "length": 2350
                    },
                    "oid": "30430",
                    "status": "open",
                    "id": "81519",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 40, "direction": { "source": 28, "target": 27 }, "latLngs": [[77, 490], [75, 422]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "1 Kornockabfahrt",
                    "additional-info": {
                        "length": 2350
                    },
                    "oid": "30430",
                    "status": "open",
                    "id": "81519",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 41, "direction": { "source": 18, "target": 28 }, "latLngs": [[59, 377], [77, 490]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Kornockbahn",
                    "oid": "29857",
                    "status": "closed",
                    "id": "8151",
                    "subtitle": "6-chair lift",
                    "clients-sub-id": 2605
                },
            },
            {
                "id": 42, "direction": { "source": 28, "target": 29 }, "latLngs": [[77, 490], [70, 490]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "1 Kornockabfahrt",
                    "additional-info": {
                        "length": 2350
                    },
                    "oid": "30430",
                    "status": "open",
                    "id": "81519",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 43, "direction": { "source": 29, "target": 30 }, "latLngs": [[70, 490], [12, 490]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "14 Schafalmabfahrt",
                    "additional-info": {
                        "length": 1350
                    },
                    "oid": "30445",
                    "status": "open",
                    "id": "81532",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 44, "direction": { "source": 29, "target": 32 }, "latLngs": [[70, 490], [66, 467]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "11 Kornock Schuss",
                    "oid": "316742",
                    "status": "open",
                    "id": "815101",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 45, "direction": { "source": 32, "target": 18 }, "latLngs": [[66, 467], [59, 377]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "2 Hirschkogelabfahrt",
                    "additional-info": {
                        "length": 800
                    },
                    "oid": "30431",
                    "status": "open",
                    "id": "81520",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 46, "direction": { "source": 30, "target": 31 }, "latLngs": [[12, 490], [65, 477]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Schafalmbahn",
                    "oid": "29875",
                    "status": "open",
                    "id": "8156",
                    "subtitle": "6-chair lift",
                    "clients-sub-id": 2605
                },
            },
            {
                "id": 47, "direction": { "source": 31, "target": 33 }, "latLngs": [[65, 477], [55, 470]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "difficult",
                "popup": {
                    "lynx-type": "slope",
                    "title": "15 Schafnase",
                    "additional-info": {
                        "length": 600
                    },
                    "oid": "30447",
                    "status": "open",
                    "id": "81533",
                    "subtitle": "slope (difficult)",
                    "clients-sub-id": 2616
                },
            },
            {
                "id": 48, "direction": { "source": 33, "target": 30 }, "latLngs": [[55, 470], [12, 490]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "6 Schafkopfabfahrt",
                    "oid": "30446",
                    "status": "open",
                    "id": "81534",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 49, "direction": { "source": 34, "target": 33 }, "latLngs": [[60, 460], [55, 470]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "easy",
                "popup": {
                    "lynx-type": "slope",
                    "title": "17 Lampelabfahrt",
                    "oid": "30426",
                    "status": "open",
                    "id": "81535",
                    "subtitle": "slope (easy)",
                    "clients-sub-id": 2614
                },
            },
            {
                "id": 50, "direction": { "source": 35, "target": 34 }, "latLngs": [[56, 405], [60, 460]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                    "lynx-type": "lift",
                    "title": "Hirschkogellift",
                    "oid": "316741",
                    "status": "open",
                    "id": "81517",
                    "subtitle": "T-bar",
                    "clients-sub-id": 2607
                },
            },
            {
                "id": 51, "direction": { "source": 34, "target": 36 }, "latLngs": [[60, 460], [50, 385]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "4 MAPAKI Familienabfahrt",
                    "additional-info": {
                        "length": 1100
                    },
                    "oid": "30435",
                    "status": "open",
                    "id": "81522",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 52, "direction": { "source": 36, "target": 18 }, "latLngs": [[50, 385], [59, 377]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "3 Pauliabfahrt",
                    "additional-info": {
                        "length": 1300,
                        "length-open": 0
                    },
                    "oid": "30434",
                    "status": "open",
                    "id": "81521",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 53, "direction": { "source": 32, "target": 36 }, "latLngs": [[66, 467], [50, 385]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "3 Pauliabfahrt",
                    "additional-info": {
                        "length": 1300,
                        "length-open": 0
                    },
                    "oid": "30434",
                    "status": "open",
                    "id": "81521",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
            {
                "id": 54, "direction": { "source": 12, "target": 10 }, "latLngs": [[60, 330], [55, 316]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                    "lynx-type": "slope",
                    "title": "19 Zirbenwaldabfahrt",
                    "additional-info": {
                        "length": 1200,
                        "length-open": 0
                    },
                    "oid": "30432",
                    "status": "open",
                    "id": "81537",
                    "subtitle": "slope (medium)",
                    "clients-sub-id": 2615
                },
            },
        ]
    };


    //set the startNodeId and endNodeId status back to the father component
    useEffect(() => {
        getStartNodeId(startNodeId)
        getEndNodeId(endNodeId)

    }, [startNodeId, endNodeId])


    useEffect(() => {
        graphData1.nodes.forEach(node => {
            // Create and add markers for each node
            const marker = L.marker(node.latLng);
            marker.addTo(map);
            // Add event listener to handle node click
            marker.on('click', () => handleNodeClick(node.id));
            // change marker color
            marker.setIcon(
                node.id === startNodeId || node.id === endNodeId ?
                    L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: #AB03FA; border-radius: 100%; height: 10px; width: 10px;"></div>`,
                    }) :
                    L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: #FA8D03; border-radius: 100%; height: 10px; width: 10px;"></div>`,
                    })
            );
            // Add popup for the node on mouseover
            marker.on('mouseover', () => {
                marker.bindPopup(`<b>${node.id}. Node ${node.title}</b>`).openPopup();
            });
            // Close popup on mouseout
            marker.on('mouseout', () => {
                marker.closePopup();
            });
        });

        graphData1.edges.forEach(edge => {
            const latLngs = edge.latLngs;

            var latlng1 = [latLngs[0][0], latLngs[0][1]],
                latlng2 = [latLngs[1][0], latLngs[1][1]];

            var offsetX = latlng2[1] - latlng1[1],
                offsetY = latlng2[0] - latlng1[0];

            var r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
                theta = Math.atan2(offsetY, offsetX);

            var thetaOffset = (3.14 / 10);

            var r2 = (r / 2) / (Math.cos(thetaOffset)),
                theta2 = theta + thetaOffset;

            var midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
                midpointY = (r2 * Math.sin(theta2)) + latlng1[0];

            // Check if the edge type is "lift"
            const isLiftEdge = edge.type === "lift";

            // Calculate the control point for the curve
            var midpointLatLng = [];
            if (!isLiftEdge) {
                midpointLatLng = [midpointY, midpointX];
            }

            // Change the color of the edge based on type
            let color = 'grey';
            if (edge.type === 'slope') {
                if (edge.difficulty === 'easy') {
                    color = '#0364FA';
                } else if (edge.difficulty === 'medium') {
                    color = 'red';
                } else {
                    color = 'black';
                }
            } else if (edge.type === 'lift') {
                color = 'green';
            }

            // Create a curved line if it's not a "lift" edge
            const curve = !isLiftEdge && edge.isMultipleEdges === true ?
                L.curve(
                    [
                        'M', latLngs[0],
                        'Q', midpointLatLng, latLngs[1],
                    ],
                    { color: color, weight: 3 }
                ) :
                L.polyline(latLngs, { color: color, weight: 3 });

            curve.addTo(map);

            // Add popup for the edge on mouseover
            curve.on('mouseover', () => {
                let statusColor = 'black'; // Default color

                // Define colors based on different status values
                if (edge.popup.status === 'open') {
                    statusColor = 'green';
                } else if (edge.popup.status === 'closed') {
                    statusColor = 'red';
                }

                let image = '';
                // Define image based on different status values
                if (edge.popup.status === 'open') {
                    image = 'https://cdn-icons-png.flaticon.com/128/5610/5610944.png';
                } else if (edge.popup.status === 'closed') {
                    image = 'https://cdn-icons-png.flaticon.com/128/1828/1828843.png';
                }

                const popupContent = !isLiftEdge ?
                    `<div><img src="${image}" alt="Icon" style="width: 20px; height: 20px; margin-right: 5px;"><b>${edge.popup.title}</b><br><p>Length: ${edge.popup['additional-info'].length}</p><p>${edge.popup.subtitle} <b style="color: ${statusColor};">${edge.popup.status}</b></p></div>` :
                    `<div><img src="${image}" alt="Icon" style="width: 20px; height: 20px; margin-right: 5px;"><b>${edge.popup.title}</b><br><p>${edge.popup.subtitle} <b style="color: ${statusColor};">${edge.popup.status}</b></p></div>`;
                curve.bindPopup(popupContent).openPopup();
            });


            // Close popup on mouseout
            curve.on('mouseout', () => {
                curve.closePopup();
            });

            // Highlight edge if it's part of the shortest path
            if (shortestPath.find(pathEdge => pathEdge.id === edge.id)) {
                curve.setStyle({ color: 'grey' });
            }
        });

    }, [map, graphData1, shortestPath, startNodeId, endNodeId]);

    const handleNodeClick = (nodeId) => {
        if (startNodeId === null) {
            setStartNodeId(nodeId);
        } else if (endNodeId === null) {
            setEndNodeId(nodeId);
        }
    };

    //this need to be open

    // useEffect(() => {
    //     // Calculate and set the shortest path when start or end node changes
    //     if (startNodeId !== null && endNodeId !== null) {
    //         setShortestPath(calculateShortestPath(startNodeId, endNodeId));
    //     }
    // }, [startNodeId, endNodeId]);

    // const calculateShortestPath = (startNodeId, endNodeId) => {
    //     const shortestPath = [654, 3474, 8834];
    //     return shortestPath;
    // };


    return (
        <>
            <ImageOverlay url={imageUrl1} bounds={[[0, 250], [500, 500]]} />
        </>
    );
})

export default MapWithGraph;

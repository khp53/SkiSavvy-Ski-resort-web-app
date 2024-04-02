import { request } from "@/utils";

export function getMapSlopeAPI() {
    return request({
        url:'/api/resort',
        method:'GET',
    })
}
export function sentPathAPI() {
    return request({
        url:'/api/path',
        method:'POST',
    })
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiResponse } from "../types/ApiResponse";
import cache from "./cache";
const API_URL = false
          ? "https://adeco.onrender.com"
          : "http://192.168.43.195:3000";

interface Options extends RequestInit  {
          cacheData?: boolean,
          checkInCacheFirst?: boolean
}
const initialOptions = {
          method: 'GET',
          cacheData: false,
          checkInCacheFirst: false
}

/**
 * consomer une api avec les options par défaut
 * @param {string} url - le lien à appeler
 * @param {object} options - autres options comme les headers et le body
 * @returns {Promise}
 */
export default async function fetchApi(url: string, options: Options = initialOptions): Promise<ApiResponse> {
          options = {
                    ...initialOptions,
                    ...options
          }
          const cacheFirst = options.method == "GET" && options.checkInCacheFirst
          if(cacheFirst) {
                    const data = await cache.get(url)
                    if(data) {
                              return data
                    }
          }
          const userF = await AsyncStorage.getItem("user");
          var user
          if(userF) {
                    user = JSON.parse(userF);
          }
          // await wait(200)
          if (user) {
                    options = {
                              ...options,
                              headers: { ...options.headers, authorization: `bearer ${user.token}` },
                    };
          }
          const response = await fetch(API_URL + url, {
                    ...options,
          });

          const canIcache = options.method == "GET" && options.cacheData
          if (response.ok) {
                    const data: ApiResponse = await response.json();
                    if(canIcache) {
                              cache.store(url, data)
                    }
                    return data
          } else {
                    throw await response.json();
          }
}
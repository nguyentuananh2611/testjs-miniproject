import { axiosInstance } from "../sdk";
import { getToken } from "./helper";

export const apiLogin = (data) =>
  axiosInstance
    .post("api/web-authenticate", {
      username: data.username,
      password: data.password,
    })
    .then((res) => res.data);

export const apiGetMe = () =>
  axiosInstance
    .get("api/me", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => res.data.user);

export const apiLogout = () =>
  axiosInstance
    .post(
      "api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((res) => res.data);

export const apiGetSpecies = (filter) =>
  axiosInstance
    .get(`api/species?${filter}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((res) => res.data);

export const apiGetRank = () =>
  axiosInstance
    .get(
      "https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Kingdom&ranks[]=Phylum&ranks[]=Class&ranks[]=Order&ranks[]=Family&ranks[]=Genus",
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    .then((res) => res.data);

export const apiAddSpecies = (postData) =>
  axiosInstance
    .post(`api/species`, postData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((res) => res.data);

export const apiGetSpeciesID = (id) =>
  axiosInstance
    .get(`api/species/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((res) => res.data);

export const apiPutDataSpecies = (updateData, id) =>
  axiosInstance
    .put(`api/species/${id}`, updateData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((res) => res.data);

export const apiDelete = (id) =>
  axiosInstance
    .delete(`api/species/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((res) => res.data);

export const apiDanhMuc = () =>
  axiosInstance
    .get(
      "https://wlp.howizbiz.com/api/danhmuccha?ma_danh_mucs[]=REDBOOK&ma_danh_mucs[]=IUCN",
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    .then((res) => res.data);

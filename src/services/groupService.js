import { data } from "react-router-dom";
import {
  getAllGroupApi,
  getOneGroupApi,
  createOneGroupApi,
  deleteOneGroupApi,
  updateOneGroupApi,
  joinOneGroupApi,
  requestToJoinGroupApi,
  approveJoinRequestApi,
  denyJoinRequestApi,
} from "../api/admin/groupApi";

export const getAllGroupService = async () => {
  try {
    const response = await getAllGroupApi();
    return response.data;
   
  } catch (err) {
    throw err.response?.data || { message: "failed to fetch group" };
  }
};

export const createOneGroupService = async (data) => {
  try {
    const response = await createOneGroupApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create group" };
  }
};

export const getOneGroupService = async (id) => {
  try {
    const response = await getOneGroupApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to load data" };
  }
};

export const updateOneGroupService = async (id, data) => {
  try {
    const response = await updateOneGroupApi(id, group);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "failed to update data" };
  }
};

export const deleteOneGroupService = async (id) => {
  try {
    const response = await deleteOneGroupApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete group" };
  }
};

export const joinOneGroupService = async (id) => {
  try {
    const response = await joinOneGroupApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "failed to join a group" };
  }
};

export const requestToJoinGroupService = (id, data) =>
  requestToJoinGroupApi(id, data);

export const approveJoinRequestService = (groupId, requestId) =>
  approveJoinRequestApi(groupId, requestId);

export const denyJoinRequestService = (groupId, requestId) =>
  denyJoinRequestApi(groupId, requestId);

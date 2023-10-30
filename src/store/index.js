import { configureStore, createSlice } from "@reduxjs/toolkit";

// 클레임 모달창 컨트롤
const claimModal = createSlice({
  name: "showClaim",
  initialState: { showClaim: false },
  reducers: {
    setClaimModal(state, action) {
      state.showClaim = action.payload;
    },
  },
});

// 스테이킹 모달창 컨트롤
const stakingModal = createSlice({
  name: "stakingModal",
  initialState: { stakingModal: false },
  reducers: {
    setStakingModal(state, action) {
      state.stakingModal = action.payload;
    },
  },
});
// 캔슬 스테이킹 모달
const cancelStakingModal = createSlice({
  // 오타있음
  name: "canecelStakingModal",
  initialState: { cancelStakingModal: false },
  reducers: {
    setCancelStakingModal(state, action) {
      state.cancelStakingModal = action.payload;
    },
  },
});
// 캔슬 팀 스테이킹 모달
const cancelTeamStakingModal = createSlice({
  name: "cancelTeamStakingModal",
  initialState: { cancelTeamStakingModal: false },
  reducers: {
    setCancelStakingModal(state, action) {
      state.cancelTeamStakingModal = action.payload;
    },
  },
});
// 드랍다운 컨트롤
const isOpen = createSlice({
  name: "isOpen",
  initialState: { isOpen: false },
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

// 드랍다운 클릭시 글자 변경
const selectedState = createSlice({
  name: "selectedState",
  initialState: { title: "All" },
  reducers: {
    setSelectedState(state, action) {
      state.title = action.payload;
    },
  },
});

const activeTab = createSlice({
  name: "activeTab",
  initialState: { num: 0 },
  reducers: {
    setActiveTab(state, action) {
      state.num = action.payload;
    },
  },
});

export const { setSelectedState } = selectedState.actions;
export const { setIsOpen } = isOpen.actions;
export const { setClaimModal } = claimModal.actions;
export const { setStakingModal } = stakingModal.actions;
export const { setCancelStakingModal } = cancelStakingModal.actions;
export const { setCancelTeamStakingModal } = cancelTeamStakingModal.actions;
export const { setActiveTab } = activeTab.actions;

export default configureStore({
  reducer: {
    selectedState: selectedState.reducer,
    isOpen: isOpen.reducer,
    claimModal: claimModal.reducer,
    stakingModal: stakingModal.reducer,
    cancelStakingModal: cancelStakingModal.reducer,
    cancelTeamStakingModal: cancelTeamStakingModal.reducer,
    activeTab: activeTab.reducer,
  },
});

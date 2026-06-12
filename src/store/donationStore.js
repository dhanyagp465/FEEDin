import { create } from 'zustand';

const useDonationStore = create((set) => ({
  donations: [],
  selectedDonation: null,
  claims: [],
  filters: {
    status: 'ALL',
    category: 'ALL',
    distance: 50,
    sortBy: 'recent'
  },

  setDonations: (donations) => set({ donations }),
  addDonation: (donation) => set((state) => ({ donations: [donation, ...state.donations] })),
  updateDonation: (id, updates) =>
    set((state) => ({
      donations: state.donations.map((d) => (d._id === id ? { ...d, ...updates } : d))
    })),
  selectDonation: (donation) => set({ selectedDonation: donation }),
  setClaims: (claims) => set({ claims }),
  setFilters: (filters) => set({ filters }),
  
  claimDonation: (donationId, ngoId) =>
    set((state) => ({
      donations: state.donations.map((d) =>
        d._id === donationId ? { ...d, status: 'RESERVED', claimedBy: ngoId } : d
      )
    })),

  unclaimDonation: (donationId) =>
    set((state) => ({
      donations: state.donations.map((d) =>
        d._id === donationId ? { ...d, status: 'AVAILABLE', claimedBy: null } : d
      )
    }))
}));

export default useDonationStore;

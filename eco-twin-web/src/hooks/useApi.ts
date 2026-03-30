import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';

// ── Closet ──
export function useCloset() {
  return useQuery({
    queryKey: ['closet'],
    queryFn: async () => {
      const { data } = await api.get('/api/closet');
      return data;
    },
  });
}

export function useAddItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: FormData | object) => {
      const { data } = await api.post('/api/closet', item);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['closet'] }),
  });
}

export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/closet/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['closet'] }),
  });
}

export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string;[key: string]: unknown }) => {
      const { data } = await api.patch(`/api/closet/${id}`, updates);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['closet'] }),
  });
}

// ── Dashboard ──
export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/api/dashboard');
      return data;
    },
  });
}

// ── Profile ──
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/api/profile');
      return data;
    },
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updates: object) => {
      const { data } = await api.patch('/api/profile', updates);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

// ── Badges ──
export function useBadges() {
  return useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const { data } = await api.get('/api/badges');
      return data;
    },
  });
}

// ── Scan ──
export function useScanItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['closet'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

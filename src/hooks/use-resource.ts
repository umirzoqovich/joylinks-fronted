'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminApi, type AdminResource } from '@/lib/api/admin';

export const resourceKeys = {
  list: (resource: AdminResource) => ['admin', resource, 'list'] as const,
  detail: (resource: AdminResource, id: string) => ['admin', resource, 'detail', id] as const,
};

/** Admin resursi uchun ro'yxat va CRUD mutatsiyalari (toast xabarlari bilan) */
export function useResource<T extends { id: string }>(resource: AdminResource) {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', resource] });
  const onError = (error: Error) => toast.error(error.message);

  const list = useQuery({
    queryKey: resourceKeys.list(resource),
    queryFn: () => adminApi.list<T>(resource),
  });

  const create = useMutation({
    mutationFn: (body: unknown) => adminApi.create<T>(resource, body),
    onSuccess: () => {
      toast.success("Muvaffaqiyatli qo'shildi");
      return invalidate();
    },
    onError,
  });

  const update = useMutation({
    mutationFn: ({ id, body }: { id: string; body: unknown }) => adminApi.update<T>(resource, id, body),
    onSuccess: () => {
      toast.success('Saqlandi');
      return invalidate();
    },
    onError,
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminApi.remove(resource, id),
    onSuccess: () => {
      toast.success("O'chirildi");
      return invalidate();
    },
    onError,
  });

  return { list, create, update, remove };
}

/** Tahrirlash uchun bitta yozuvning to'liq ma'lumoti */
export function useResourceDetails<T>(resource: AdminResource, id: string | null, enabled = true) {
  return useQuery({
    queryKey: resourceKeys.detail(resource, id ?? ''),
    queryFn: () => adminApi.get<T>(resource, id!),
    enabled: Boolean(id) && enabled,
  });
}

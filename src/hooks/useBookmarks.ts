import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Описуємо структуру твого проекту. 
// Я додав базові поля, які зазвичай є у GitHub-проектах. 
// Ти зможеш додати сюди інші поля, коли ми дійдемо до бекенду.
export interface Project {
  _id?: string;
  title: string;
  description?: string;
  url?: string;
  language?: string;
  // додай інші поля за потреби
}

// Інтерфейс для аргументів мутації
interface ToggleBookmarkArgs {
  project: Project;
  isSaved: boolean;
}

export const useBookmarks = () => {
  // Вказуємо, що useQuery повертає масив проектів (Project[])
  return useQuery<Project[], Error>({
    queryKey: ['bookmarks'],
    queryFn: async (): Promise<Project[]> => {
      const response = await axios.get('/api/bookmarks');
      return response.data;
    },
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  // Типізуємо useMutation
  return useMutation<void, Error, ToggleBookmarkArgs>({
    mutationFn: async ({ project, isSaved }: ToggleBookmarkArgs): Promise<void> => {
      if (isSaved) {
        // Якщо вже збережено — видаляємо по title
        await axios.delete('/api/bookmark', { data: { title: project.title } });
      } else {
        // Якщо не збережено — додаємо весь об'єкт проекту
        await axios.post('/api/bookmark', project);
      }
    },
    onSuccess: () => {
      // Оновлюємо кеш після успішної мутації
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};
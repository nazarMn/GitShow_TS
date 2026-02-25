// --- ДОПОМІЖНІ ТИПИ ДЛЯ CV ---
export interface IEducation {
  university: string;
  specialty: string;
  startYear: number | null;
  endYear: number | null;
}

export interface IExperience {
  _id?: string; // Mongoose часто додає _id до вкладених об'єктів
  name: string;
  yearsAndPosition: string;
  description: string;
  descriptions: string[];
}

// --- ГОЛОВНІ МОДЕЛІ ---

export interface ICV {
  _id: string;
  userId: string; // ID користувача (референс на IUser, який ми створимо пізніше)
  templateId: string;
  name?: string; // Поле не обов'язкове (required: false)
  avatarUrl: string;
  specialty: string;
  summary: string;
  phoneNumber: string;
  location: string;
  email: string;
  references: string[];
  skills: string[];
  education: IEducation;
  experience: IExperience[];
  shareableLink: string;
  createdAt: string; // На фронтенді дати з JSON приходять як string
}

export interface IMessage {
  _id: string;
  chatId: string;
  sender: string; // ID користувача (або повний об'єкт IUser, якщо робиш populate)
  text: string;
  createdAt: string;
}
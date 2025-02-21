import { makeAutoObservable } from 'mobx';

class WordStore {
	words = [];
	loading = true;
	error = null;

	constructor() {
		makeAutoObservable(this);
	}

	async fetchWords() {
		try {
			this.loading = true;
			const response = await fetch(
				'http://itgirlschool.justmakeit.ru/api/words'
			);
			if (!response.ok) throw new Error('Ошибка загрузки данных');
			this.words = await response.json();
		} catch (err) {
			this.error = err.message;
		} finally {
			this.loading = false;
		}
	}

	async addWord(newWord) {
		try {
			const response = await fetch(
				'http://itgirlschool.justmakeit.ru/api/words/add',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newWord),
				}
			);
			const savedWord = await response.json();
			this.words.push(savedWord);
		} catch {
			this.error = 'Ошибка при добавлении слова';
		}
	}

	async updateWord(id, updatedWord) {
		try {
			const response = await fetch(
				`http://itgirlschool.justmakeit.ru/api/words/${id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updatedWord),
				}
			);
			if (!response.ok) throw new Error('Ошибка обновления');
			this.words = this.words.map((word) =>
				word.id === id ? updatedWord : word
			);
		} catch (err) {
			this.error = err.message;
		}
	}

	async deleteWord(id) {
		try {
			await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
				method: 'DELETE',
			});
			this.words = this.words.filter((word) => word.id !== id);
		} catch (err) {
			this.error = 'Ошибка при удалении слова';
		}
	}
}

export const wordStore = new WordStore();

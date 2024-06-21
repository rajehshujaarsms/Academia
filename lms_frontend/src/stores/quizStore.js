import { defineStore } from "pinia";
import axios from "axios";

export const useQuizStore = defineStore("quiz", {
	state: () => ({
		quizzes: [],
		quiz: {},
		quizInstructions: [],
		quizResult: {},
		loading: false,
		error: null,
	}),
	actions: {
		async fetchQuizzes(courseName, studentId) {
			this.loading = true;
			this.error = null;
			try {
				const response = await axios.get(
					"http://localhost:8080/api/method/academia.lms_api.student.quiz.quiz.get_quizzes_by_course",
					{
						params: {
							course_name: courseName,
							student_id: studentId,
						},
					}
				);
				this.quizzes = response.data.data;
			} catch (error) {
				this.error = error.message || "An error occurred while fetching quizzes.";
			} finally {
				this.loading = false;
			}
		},

		async fetchQuizInstructions(quizName, studentId) {
			this.loading = true;
			this.error = null;
			try {
				const response = await axios.get(
					"http://localhost:8080/api/method/academia.lms_api.student.quiz.quiz.get_quiz_instruction",
					{
						params: {
							quiz_name: quizName,
							student_id: studentId,
						},
					}
				);
				this.quizInstructions = response.data.data;
			} catch (error) {
				this.error = error.message || "An error occurred while fetching quiz instructions.";
			} finally {
				this.loading = false;
			}
		},

		async fetchQuiz(quizName) {
			this.loading = true;
			this.error = null;
			try {
				const response = await axios.get(
					`http://localhost:8080/api/method/academia.lms_api.student.quiz.quiz.get_quiz`,
					{
						params: {
							quiz_name: quizName,
						},
					}
				);
				this.quiz = response.data.data;
			} catch (error) {
				this.error = error.message || "An error occurred while fetching the quiz.";
			} finally {
				this.loading = false;
			}
		},

		async submitQuiz(data) {
			this.loading = true;
			this.error = null;
			try {
				const response = await axios.post(
					`http://localhost:8080/api/method/academia.lms_api.student.quiz.quiz.create_quiz_attempt`,
					data
				);
				if (response.data.status_code === 200) {
					console.log(response.data.quiz_attempt_id);
					return response.data.quiz_attempt_id; // Return the quiz_attempt_id
				} else {
					this.error = response.data.message || "An error occurred while submitting the quiz.";
					return null;
				}
			} catch (error) {
				this.error = error.message || "An error occurred while submitting the quiz.";
				return null;
			} finally {
				this.loading = false;
			}
		},

		async fetchQuizResult(quizAttemptId) {
			this.loading = true;
			this.error = null;
			try {
				const response = await axios.get(
					`http://localhost:8080/api/method/academia.lms_api.student.quiz.quiz.get_quiz_result`,
					{
						params: { quiz_attempt_id: quizAttemptId },
					}
				);
				this.quizResult = response.data.data;
			} catch (error) {
				this.error = error.response?.data?.message || error.message;
			} finally {
				this.loading = false;
			}
		},
	},
});

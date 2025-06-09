import { Stack } from 'expo-router';

export default function SubjectLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="learn" />
      <Stack.Screen name="syllabus" />
      <Stack.Screen name="textbooks" />
      <Stack.Screen name="past-papers" />
      <Stack.Screen name="chapter/[chapterId]" />
      <Stack.Screen name="topic/[topicId]" />
      <Stack.Screen name="quiz/[quizId]" />
      <Stack.Screen name="paper/[paperId]" />
    </Stack>
  );
}
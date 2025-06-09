import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/Card';
import { getColors } from '@/constants/colors';
import { ArrowLeft, Send, Bot, User, Mic, Image as ImageIcon } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIAssistantScreen() {
  const colors = getColors();
  const { id, topic } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: `Hi! I'm your AI learning assistant. I'm here to help you understand Mathematics concepts, solve problems, and answer any questions you have. What would you like to learn about today?`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('quadratic') || input.includes('equation')) {
      return `Great question about quadratic equations! 

A quadratic equation has the form ax² + bx + c = 0, where a ≠ 0.

Here are the main methods to solve them:

1. **Factoring**: Look for two numbers that multiply to give 'ac' and add to give 'b'
2. **Quadratic Formula**: x = (-b ± √(b²-4ac)) / 2a
3. **Completing the Square**: Rewrite as (x + p)² = q

Would you like me to work through a specific example?`;
    }
    
    if (input.includes('help') || input.includes('stuck')) {
      return `I'm here to help! Here's what I can assist you with:

📚 **Concept Explanations**: Break down complex topics into simple steps
🔢 **Problem Solving**: Work through math problems step-by-step
📝 **Practice Questions**: Generate practice problems for you
🎯 **Study Tips**: Suggest effective learning strategies
📖 **Past Papers**: Help with past exam questions

What specific topic or problem would you like help with?`;
    }
    
    if (input.includes('formula') || input.includes('formulas')) {
      return `Here are some key formulas for this chapter:

**Quadratic Equations:**
• Standard form: ax² + bx + c = 0
• Quadratic formula: x = (-b ± √(b²-4ac)) / 2a
• Discriminant: Δ = b² - 4ac

**Factoring:**
• Difference of squares: a² - b² = (a+b)(a-b)
• Perfect square: a² ± 2ab + b² = (a ± b)²

Would you like me to explain how to use any of these formulas?`;
    }
    
    return `That's an interesting question! Let me help you understand this better.

Based on what you're asking, I'd recommend:

1. **Review the basics** - Make sure you understand the fundamental concepts
2. **Practice with examples** - Work through similar problems step by step
3. **Ask specific questions** - The more specific your question, the better I can help

Could you provide more details about what specifically you're struggling with? I'm here to help you succeed! 🎓`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickPrompts = [
    "Explain quadratic equations",
    "Help me solve x² + 5x + 6 = 0",
    "What's the quadratic formula?",
    "Give me practice problems",
  ];

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.aiAvatar}>
            <Bot color="#ffffff" size={24} />
          </View>
          <View>
            <Text style={styles.aiName}>AI Learning Assistant</Text>
            <Text style={styles.aiStatus}>
              {isTyping ? 'Typing...' : 'Online'}
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessageContainer : styles.aiMessageContainer
            ]}
          >
            {!message.isUser && (
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Bot color="#ffffff" size={16} />
              </View>
            )}
            
            <Card style={[
              styles.messageCard,
              message.isUser 
                ? { backgroundColor: colors.primary } 
                : { backgroundColor: colors.surface }
            ]}>
              <Text style={[
                styles.messageText,
                { color: message.isUser ? '#ffffff' : colors.text }
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.messageTime,
                { color: message.isUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary }
              ]}>
                {formatTime(message.timestamp)}
              </Text>
            </Card>

            {message.isUser && (
              <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
                <User color="#000000" size={16} />
              </View>
            )}
          </View>
        ))}

        {isTyping && (
          <View style={styles.typingContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Bot color="#ffffff" size={16} />
            </View>
            <Card style={[styles.typingCard, { backgroundColor: colors.surface }]}>
              <View style={styles.typingIndicator}>
                <View style={[styles.typingDot, { backgroundColor: colors.textSecondary }]} />
                <View style={[styles.typingDot, { backgroundColor: colors.textSecondary }]} />
                <View style={[styles.typingDot, { backgroundColor: colors.textSecondary }]} />
              </View>
            </Card>
          </View>
        )}

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <View style={styles.quickPromptsContainer}>
            <Text style={[styles.quickPromptsTitle, { color: colors.textSecondary }]}>
              Quick questions to get started:
            </Text>
            {quickPrompts.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickPrompt, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => setInputText(prompt)}
              >
                <Text style={[styles.quickPromptText, { color: colors.text }]}>
                  {prompt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            placeholder="Ask me anything about Mathematics..."
            placeholderTextColor={colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.inputAction}>
              <Mic color={colors.textSecondary} size={20} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.inputAction}>
              <ImageIcon color={colors.textSecondary} size={20} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? colors.primary : colors.neutral }
              ]}
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <Send color="#ffffff" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  aiStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 24,
    paddingBottom: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  messageCard: {
    maxWidth: '75%',
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  typingCard: {
    padding: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  quickPromptsContainer: {
    marginTop: 20,
  },
  quickPromptsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
  },
  quickPrompt: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  quickPromptText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
    paddingVertical: 8,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
  inputAction: {
    padding: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
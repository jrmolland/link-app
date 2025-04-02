import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { MessageBubble } from '@/components/messaging/MessageBubble';
import { MessageInput } from '@/components/messaging/MessageInput';
import { Message, User, Match } from '@/types/user';
import { Video, Phone, Info } from 'lucide-react-native';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];
  const router = useRouter();
  
  const messages = useAppStore(state => state.messages);
  const matches = useAppStore(state => state.matches);
  const users = useAppStore(state => state.users);
  const sendMessage = useAppStore(state => state.sendMessage);
  const markMessageAsRead = useAppStore(state => state.markMessageAsRead);
  
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const match = matches.find(m => m.id === id);
  const matchedUser = users.find(u => match && u.id === match.matchedUserId);
  
  const chatMessages = messages
    .filter(msg => msg.matchId === id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  useEffect(() => {
    // Mark all messages as read when opening the chat
    chatMessages.forEach(msg => {
      if (!msg.isRead && msg.receiverId === 'current-user') {
        markMessageAsRead(msg.id);
      }
    });
  }, [chatMessages]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatMessages.length]);
  
  const handleSend = (text: string, type: 'text') => {
    if (!match || !matchedUser) return;
    
    sendMessage(match.id, text, type);
    setInputText('');
  };
  
  const renderHeaderTitle = () => {
    if (!matchedUser) return null;
    
    const profilePhoto = matchedUser.photos.find(photo => photo.isProfile) || matchedUser.photos[0];
    
    return (
      <TouchableOpacity 
        style={styles.headerTitle}
        onPress={() => router.push(`/profile/${matchedUser.id}`)}
      >
        <Image
          source={{ uri: profilePhoto.url }}
          style={styles.headerAvatar}
        />
        <View>
          <Text style={[styles.headerName, { color: colorScheme.text }]}>
            {matchedUser.name}
          </Text>
          <Text style={[styles.headerStatus, { color: colorScheme.placeholder }]}>
            {match?.matchType === 'dating' ? 'Dating Match' : 'Networking Connection'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderHeaderRight = () => {
    return (
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerAction}>
          <Phone size={20} color={colorScheme.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerAction}>
          <Video size={20} color={colorScheme.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerAction}>
          <Info size={20} color={colorScheme.text} />
        </TouchableOpacity>
      </View>
    );
  };
  
  if (!match || !matchedUser) {
    return (
      <View style={[styles.container, { backgroundColor: colorScheme.background }]}>
        <Text style={[styles.errorText, { color: colorScheme.text }]}>
          Conversation not found
        </Text>
      </View>
    );
  }
  
  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: renderHeaderTitle,
          headerRight: renderHeaderRight,
          headerStyle: {
            backgroundColor: colorScheme.background,
          },
          headerTintColor: colorScheme.text,
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={chatMessages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MessageBubble
                message={item}
                isCurrentUser={item.senderId === 'current-user'}
              />
            )}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colorScheme.placeholder }]}>
                  {match.interactionItem?.comment 
                    ? `You commented: "${match.interactionItem.comment}"`
                    : "No messages yet. Start the conversation!"}
                </Text>
              </View>
            }
          />
          
          <MessageInput
            onSend={handleSend}
            onImageSelect={() => {}}
            onVoiceRecord={() => {}}
            onGifSelect={() => {}}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesList: {
    padding: spacing.md,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: fontSizes.md,
    fontStyle: 'italic',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: spacing.sm,
  },
  headerName: {
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  headerStatus: {
    fontSize: fontSizes.xs,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    marginLeft: spacing.md,
  },
  errorText: {
    textAlign: 'center',
    marginTop: spacing.xl,
    fontSize: fontSizes.lg,
  },
});
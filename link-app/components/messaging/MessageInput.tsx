import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { Image, Mic, Send, Smile, Plus } from 'lucide-react-native';

interface MessageInputProps {
  onSend: (text: string, type: 'text') => void;
  onImageSelect?: () => void;
  onVoiceRecord?: () => void;
  onGifSelect?: () => void;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onImageSelect,
  onVoiceRecord,
  onGifSelect,
  placeholder = "Type a message...",
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];
  const [text, setText] = useState('');
  const [showExtras, setShowExtras] = useState(false);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim(), 'text');
      setText('');
    }
  };

  const toggleExtras = () => {
    setShowExtras(!showExtras);
  };

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: colorScheme.card,
        borderTopColor: colorScheme.border,
      }
    ]}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.extraButton}
          onPress={toggleExtras}
        >
          <Plus size={24} color={colorScheme.primary} />
        </TouchableOpacity>
        
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colorScheme.secondary,
              color: colorScheme.text,
            }
          ]}
          placeholder={placeholder}
          placeholderTextColor={colorScheme.placeholder}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={500}
        />
        
        {text.length > 0 ? (
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: colorScheme.primary }
            ]}
            onPress={handleSend}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.extraButton}
            onPress={onVoiceRecord}
          >
            <Mic size={24} color={colorScheme.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      {showExtras && (
        <View style={[
          styles.extrasContainer,
          { backgroundColor: colorScheme.card }
        ]}>
          <TouchableOpacity
            style={[
              styles.extraOption,
              { backgroundColor: colorScheme.secondary }
            ]}
            onPress={onImageSelect}
          >
            <Image size={24} color={colorScheme.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.extraOption,
              { backgroundColor: colorScheme.secondary }
            ]}
            onPress={onGifSelect}
          >
            <Smile size={24} color={colorScheme.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingVertical: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.sm : spacing.xs,
    maxHeight: 100,
  },
  extraButton: {
    padding: spacing.xs,
    marginHorizontal: spacing.xs,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  extrasContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  extraOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
});
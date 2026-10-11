# AI Companion App

تطبيق موبايل (Expo / React Native) فيه 3 خصائص: شات AI، توليد صور، توليد فيديو. مفاتيح الـ API بتتخزن محليًا ومشفّرة على الجهاز (Keychain على iOS / Keystore على Android) عن طريق `expo-secure-store` — مش متخزنة في الكود ومش بترفع لأي سيرفر.

## التشغيل محليًا

\`\`\`bash
npm install
npx expo start
\`\`\`

افتح التطبيق على موبايلك بتطبيق **Expo Go**، أو شغّل على محاكي:

\`\`\`bash
npm run ios      # يحتاج macOS + Xcode
npm run android  # يحتاج Android Studio
\`\`\`

أول ما يفتح التطبيق، روح لتبويب **Settings** وحط مفتاح OpenAI (ولو عايز فيديو، مفتاح Runway كمان).

## رفعه على GitHub

\`\`\`bash
git remote add origin https://github.com/USERNAME/ai-companion.git
git branch -M main
git push -u origin main
\`\`\`

## الصلاحيات (app.json)

- **Android:** INTERNET, ACCESS_NETWORK_STATE, READ/WRITE_EXTERNAL_STORAGE, CAMERA, RECORD_AUDIO, VIBRATE, POST_NOTIFICATIONS
- **iOS:** أذونات مكتبة الصور، الكاميرا، والمايك

عدّل `bundleIdentifier` (iOS) و`package` (Android) باسم الدومين بتاعك قبل أي build رسمي.

## بناء نسخة فعلية (APK / IPA) عن طريق GitHub Actions

\`\`\`bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android
eas build --platform ios
\`\`\`

## ملاحظة عن "بلا حدود"

كل مزوّد AI عنده حدود استخدام وسياسة محتوى — مفيش API حقيقي "بلا حدود" فعليًا.

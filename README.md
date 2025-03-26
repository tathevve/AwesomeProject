# AwesomeProject

A React Native application built with TypeScript, designed to run on both iOS and Android platforms.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) (for iOS dependencies)
- [Watchman](https://facebook.github.io/watchman/) (optional but recommended for Mac users)

## Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone <repository-url>
cd AwesomeProject

# Install dependencies
npm install

# Install iOS dependencies
cd ios && pod install && cd ..
```

## Running the App

### iOS:

```sh
npx react-native run-ios
```

If you have multiple iOS simulators, specify the device:

```sh
npx react-native run-ios --simulator="iPhone 15"
```

### Android:

Start an Android emulator via Android Studio or connect a physical device, then run:

```sh
npx react-native run-android
```

## Development

### Running Metro Bundler

If Metro bundler is not running automatically, start it manually:

```sh
npx react-native start
```

### Linting & Code Formatting

```sh
npm run lint  # Run ESLint
npm run format  # Run Prettier
```

## Troubleshooting

### Metro Bundler Issues

If you encounter caching issues, clear the cache and restart Metro:

```sh
npx react-native start --reset-cache
```

### iOS Build Issues

If the iOS build fails, try cleaning the project:

```sh
cd ios
rm -rf Pods Podfile.lock build
pod install
cd ..
```

Then rerun:

```sh
npx react-native run-ios
```

### Android Build Issues

If the Android build fails, clean the project:

```sh
cd android
./gradlew clean
cd ..
```

Then rerun:

```sh
npx react-native run-android
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

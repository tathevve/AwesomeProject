package com.awesomeproject.Messages

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import org.json.JSONObject

class MessagingInfoPackage(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MessagingInfoPackage"
    }

    @ReactMethod
    fun sendMessage(message: String, callback: Callback) {
        val responseMessage = "Received: $message"

        callback.invoke(responseMessage)
    }
}

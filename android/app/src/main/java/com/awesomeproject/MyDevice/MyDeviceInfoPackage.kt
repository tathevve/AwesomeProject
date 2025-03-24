package com.awesomeproject.MyDevice

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import org.json.JSONObject

class MyDeviceInfoPackage(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MyDeviceInfoPackage"
    }

    @ReactMethod
    fun sendMessage(message: String, callback: Callback) {
        val responseMessage = "Received: $message"

        callback.invoke(responseMessage)
    }
}

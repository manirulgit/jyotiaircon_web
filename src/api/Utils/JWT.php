<?php
declare(strict_types=1);

namespace Utils;

#[AllowDynamicProperties]
class JWT {
    private static string $secretKey = "Super_Secret_Encryption_Key_Change_In_Production!";

    public static function generate(array $payload, int $expirySeconds): string {
        $headers = json_encode(['algo' => 'HS256', 'type' => 'JWT']);
        $payload['exp'] = time() + $expirySeconds;
        $payload['iat'] = time();

        $base64UrlHeader = self::base64UrlEncode($headers);
        $base64UrlPayload = self::base64UrlEncode((string)json_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secretKey, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function verify(?string $token): ?array {
        if (!$token) return null;

        $tokenParts = explode('.', $token);
        if (count($tokenParts) !== 3) return null;

        [$header, $payload, $signature] = $tokenParts;

        $validSignature = self::base64UrlEncode(hash_hmac('sha256', $header . "." . $payload, self::$secretKey, true));
        if (!hash_equals($validSignature, $signature)) return null;

        $data = json_decode(base64_decode($payload), true);
        if (($data['exp'] ?? 0) < time()) return null;

        return $data;
    }

    private static function base64UrlEncode(string $text): string {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }
}
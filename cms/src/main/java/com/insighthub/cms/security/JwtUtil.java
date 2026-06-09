package com.insighthub.cms.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET = "mySecretSuperKey181005RandomValue11xyz";
    private final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 15;
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractEmail(String token){
        return getClaims(token).getSubject();
    }
    public boolean validateToken(String token){
        try{
            getClaims(token);
            return true;
        } catch(Exception e){
            return false;
        }
    }
    private Claims getClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

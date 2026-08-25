package com.insighthub.cms.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    private final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 15;
    private Key key;
    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

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

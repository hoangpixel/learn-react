package com.backend.flogin.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    // Ánh xạ bảng trung gian role_permissions
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_permissions", 
        joinColumns = @JoinColumn(name = "role_id"), 
        inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions = new HashSet<>();
}
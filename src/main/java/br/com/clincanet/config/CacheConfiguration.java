package br.com.clincanet.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(br.com.clincanet.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(br.com.clincanet.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.Paciente.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.Paciente.class.getName() + ".pacientes", jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.Medico.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.Medico.class.getName() + ".medicos", jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.Consulta.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.clincanet.domain.Contato.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}

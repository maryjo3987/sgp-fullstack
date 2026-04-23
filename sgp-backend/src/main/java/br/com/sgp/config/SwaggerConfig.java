package br.com.sgp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "basicAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("Sistema de Gestão de Projetos")
                        .version("1.0")
                        .description("API para gerenciamento de projetos, tarefas e usuários")
                        .license(new License()
                                .name("Licença MIT")
                                .url("https://opensource.org/licenses/MIT")))
                
                // 🔒 ADICIONA SEGURANÇA
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("basic")));
    }
}
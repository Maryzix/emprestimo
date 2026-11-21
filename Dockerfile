
# Etapa 1: compilação
FROM maven:3-eclipse-temurin-25 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn -B dependency:go-offline

COPY src ./src

RUN mvn -B -DskipTests package

# Etapa 2: execução
FROM eclipse-temurin:25-jre

WORKDIR /app

RUN mkdir -p /app/dados

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]

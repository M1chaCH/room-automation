
# 1st stage, build the app
FROM maven:3.8.4-openjdk-17-slim as build-api

WORKDIR /var/local/api/

# Create a first layer to cache the "Maven World" in the local repository.
# Incremental docker builds will always resume after that, unless you update
# the pom
ADD pom.xml .
RUN mvn package -Dmaven.test.skip -Declipselink.weave.skip

# Do the Maven build!
# Incremental docker builds will resume here when you change sources
ADD src src
RUN mvn package -DskipTests

# 2nd stage, build the runtime image
FROM openjdk:17-jdk-slim
WORKDIR /var/local/api/

# Copy the binary built in the 1st stage
COPY --from=build-api /var/local/api/target/room-automation.jar ./
COPY --from=build-api /var/local/api/target/libs ./libs

CMD ["java", "-jar", "room-automation.jar"]

EXPOSE 8080

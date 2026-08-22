import 'package:flutter/material.dart';

void main() {
  runApp(const PortalGuajiranetApp());
}

class PortalGuajiranetApp extends StatelessWidget {
  const PortalGuajiranetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Portal Guajiranet',
      theme: ThemeData(colorSchemeSeed: Colors.blue, useMaterial3: true),
      home: Scaffold(
        appBar: AppBar(title: const Text('Portal Guajiranet')),
        body: const Center(child: Text('Mobile base listo')),
      ),
    );
  }
}

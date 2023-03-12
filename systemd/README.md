# Example systemd services

## Usage

Install service:

```
sudo cp <name>.service /etc/systemd/system/
```

Using service:

```
sudo systemctl start <name>.service
sudo systemctl enable <name>.service
sudo systemctl status <name>.service
```

Reload systemd config files:

```
systemctl daemon-reload
```

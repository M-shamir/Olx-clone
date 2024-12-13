from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)  # Ensure this field is included
    is_verified = Column(Boolean, default=False)  # Ensure this field is included
    sells = relationship("Sell",back_populates="user")




class Sell(Base):
    __tablename__ = "sells"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    brand = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    fuel = Column(String, nullable=False)
    transmission = Column(String, nullable=False)
    kilometer_driven = Column(Integer, nullable=False)
    no_of_owners = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    location = Column(String, nullable=False)
    
    
    user = relationship("User", back_populates="sells")


